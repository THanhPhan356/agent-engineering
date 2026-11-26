import { readFile } from 'node:fs/promises'
import { parseArgs } from 'node:util'
import { checkBoundaries } from './boundaries.mjs'
import { readFeatureMap, verify } from './verification.mjs'
import { compareReports } from './comparison.mjs'

const usage = [
  'Usage: node agent-engineering.mjs <command>',
  '  list <feature-map.json>',
  '  verify <feature-map.json> <id> --base-url <url> --out <new-directory>',
  '       [--runs N] [--channel msedge|chrome] [--cpu] [--heap] [--video]',
  '  compare <baseline-report.json> <candidate-report.json> [--min-percent N]',
  '  boundaries <boundaries.json>',
  '',
  'Exit codes: 0 success, 1 failed assertion or boundary violation, 2 setup/input error.',
].join('\n')

async function main() {
  const [command, ...args] = process.argv.slice(2)
  if (!command || command === '--help' || args.includes('--help')) {
    console.log(usage)
    return
  }

  const commands = {
    list: { count: 1, options: {} },
    verify: { count: 2, options: {
      'base-url': { type: 'string' }, out: { type: 'string' },
      runs: { type: 'string', default: '1' }, channel: { type: 'string' },
      cpu: { type: 'boolean' }, heap: { type: 'boolean' }, video: { type: 'boolean' },
    } },
    compare: { count: 2, options: { 'min-percent': { type: 'string', default: '0' } } },
    boundaries: { count: 1, options: {} },
  }
  if (!Object.hasOwn(commands, command)) throw new Error('Unknown command: ' + command)
  const { count, options } = commands[command]
  const { values, positionals } = parseArgs({ args, options, allowPositionals: true })
  if (positionals.length !== count) throw new Error('Wrong argument count for ' + command + '. See --help.')
  const [first, second] = positionals
  let result
  switch (command) {
    case 'list':
      result = (await readFeatureMap(first)).map(({ id, description, route }) => ({ id, description, route }))
      break
    case 'verify':
      result = await verify(first, second, values)
      if (!result.passed) process.exitCode = 1
      break
    case 'compare': {
      const reports = await Promise.all([first, second].map(async file => JSON.parse(await readFile(file, 'utf8'))))
      result = compareReports(...reports, Number(values['min-percent']))
      break
    }
    case 'boundaries':
      result = await checkBoundaries(first)
      if (result.violations.length) process.exitCode = 1
      break
  }
  console.log(JSON.stringify(result, null, 2))
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 2
})
