import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { appendFile, copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs, promisify } from 'node:util'

const execute = promisify(execFile)
const { values } = parseArgs({ options: { out: { type: 'string' }, channel: { type: 'string' } } })
if (!values.out) throw new Error('Usage: npm run smoke -- --out <new-directory> [--channel msedge|chrome]')

const out = resolve(values.out)
const cli = fileURLToPath(new URL('../agent-engineering.mjs', import.meta.url))
const map = fileURLToPath(new URL('../examples/feature-map.json', import.meta.url))
const boundaryConfig = fileURLToPath(new URL('../examples/boundaries.json', import.meta.url))
const commit = process.env.AE_TESTED_COMMIT
if (commit && !/^[0-9a-f]{40}$/.test(commit)) throw new Error('AE_TESTED_COMMIT must be a full Git commit SHA.')
await mkdir(out)

async function run(args, expectedCode = 0) {
  let output
  try {
    output = await execute(process.execPath, [cli, ...args], { timeout: 90000 })
  } catch (error) {
    if (error.code !== expectedCode) throw error
    return JSON.parse(error.stdout)
  }
  assert.equal(expectedCode, 0, 'The CLI unexpectedly accepted a failing fixture.')
  return JSON.parse(output.stdout)
}

const cases = []
let brokenCheckout = true
const server = createServer((request, response) => {
  response.writeHead(request.url === '/checkout' ? 200 : 404, { 'Content-Type': 'text/html; charset=utf-8' })
  const status = brokenCheckout ? 'Order declined' : 'Order confirmed'
  response.end('<input name="email"><button data-testid="submit-order">Submit</button>' +
    '<div data-testid="order-status"></div><script>document.querySelector("button").onclick = () => {' +
    'document.querySelector("div").textContent = ' + JSON.stringify(status) + '}</script>')
})

try {
  await new Promise((done, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', done)
  })
  const base = 'http://127.0.0.1:' + server.address().port
  const args = ['verify', map, 'checkout', '--base-url', base, '--timeout-ms', '4000']
  if (values.channel) args.push('--channel', values.channel)

  assert.equal((await run(['list', map]))[0].id, 'checkout')
  const broken = await run([...args, '--out', join(out, 'checkout-broken')], 1)
  assert.equal(broken.passed, false)
  assert.equal(broken.runs[0].stepsPassed, 2, 'The checkout must reach the failing assertion.')
  for (const path of ['final.png', 'trace.zip']) {
    assert((await stat(join(out, 'checkout-broken/run-1', path))).size > 0)
  }
  cases.push('Checkout regression reproduced. The failure preserved its screenshot and trace.')

  brokenCheckout = false
  const fixed = await run([...args, '--out', join(out, 'checkout-fixed'), '--runs', '3'])
  assert.equal(fixed.runs.length, 3)
  assert.equal(fixed.passed, true)
  assert.equal(fixed.scenarioHash, broken.scenarioHash)
  assert.deepEqual(fixed.environment, broken.environment)
  for (let index = 1; index <= fixed.runs.length; index++) {
    for (const path of ['final.png', 'trace.zip']) {
      assert((await stat(join(out, 'checkout-fixed', 'run-' + index, path))).size > 0)
    }
  }
  assert.equal((await run(['compare', fixed.reportPath, fixed.reportPath])).verdict, 'inconclusive')
  cases.push('The same checkout assertion passed 3/3 after the fix. Comparing identical timings was inconclusive.')

  const fixture = join(out, 'boundaries')
  const entry = join(fixture, 'src/renderer/view.ts')
  await mkdir(join(fixture, 'src/renderer'), { recursive: true })
  await mkdir(join(fixture, 'src/main'))
  await mkdir(join(fixture, 'src/shared'))
  await copyFile(boundaryConfig, join(fixture, 'boundaries.json'))
  await writeFile(join(fixture, 'tsconfig.json'), JSON.stringify({
    compilerOptions: { module: 'ESNext', moduleResolution: 'Bundler' }, include: ['src/**/*.ts'],
  }))
  await writeFile(join(fixture, 'src/main/api.ts'), 'export const value = 1;\n')
  await writeFile(join(fixture, 'src/shared/barrel.ts'), 'export { value } from "../main/api";\n')
  await writeFile(entry, 'export { value } from "../shared/barrel";\n')
  const check = ['boundaries', join(fixture, 'boundaries.json')]
  const forbidden = await run(check, 1)
  assert.deepEqual(forbidden.violations.map(({ chain }) => chain.map(p => p.replaceAll('\\', '/'))), [
    ['src/renderer/view.ts', 'src/shared/barrel.ts', 'src/main/api.ts'],
  ])
  await writeFile(entry, 'export const value = 2;\n')
  const allowed = await run(check)
  assert.deepEqual(allowed.violations, [])
  await writeFile(join(fixture, 'report.json'), JSON.stringify({ forbidden, allowed }, null, 2) + '\n')
  cases.push('The checker rejected renderer → barrel → main and accepted the safe renderer import graph.')
} catch (error) {
  process.exitCode = 1
  console.error(error)
} finally {
  server.close()
  const directories = (await readdir(out, { withFileTypes: true }))
    .filter(item => item.isDirectory())
    .map(item => item.name + '/')
  const summary = [
    '## Agent Engineering verification evidence',
    '',
    'Outcome **' + (process.exitCode ? 'Failed' : 'Passed') + '**.',
    ...(commit ? ['Tested commit ' + commit + '.'] : []),
    '',
    ...cases.map(result => '- ' + result),
    '',
    ...(directories.length ? ['Output folders ' + directories.join(', ') + '.'] : []),
    '',
  ].join('\n')
  await writeFile(join(out, 'summary.md'), summary)
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary)
  console.log(summary)
}
