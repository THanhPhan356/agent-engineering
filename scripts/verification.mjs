import { createHash } from 'node:crypto'
import { closeSync, openSync, writeSync } from 'node:fs'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { cpus } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { performance } from 'node:perf_hooks'

const require = createRequire(import.meta.url)
const actions = new Set(['click', 'fill', 'press', 'expectText', 'expectVisible'])
const asserts = new Set(['expectText', 'expectVisible'])

export async function readFeatureMap(file) {
  const { features } = JSON.parse(await readFile(file, 'utf8'))
  if (!Array.isArray(features) || features.length === 0) throw new Error('Feature map needs a non-empty features array.')
  const ids = new Set()
  return features.map((feature, index) => {
    if (!feature || !/^[a-z][a-z0-9-]*$/.test(feature.id ?? '') || ids.has(feature.id)) {
      throw new Error('Invalid or duplicate feature id at index ' + index)
    }
    const { id, description, route, measure, steps } = feature
    ids.add(id)
    if (typeof description !== 'string' || !description.trim() ||
        typeof route !== 'string' || !route.startsWith('/') || route.startsWith('//') ||
        (measure !== undefined && (typeof measure !== 'string' || !measure.trim())) ||
        !Array.isArray(steps) || !steps.some(step => asserts.has(step?.action))) {
      throw new Error(id + ' needs a description, local route and at least one assertion.')
    }
    const validated = steps.map((step, index) => {
      if (!actions.has(step?.action) || typeof step.selector !== 'string' || !step.selector.trim() ||
          (['fill', 'press', 'expectText'].includes(step.action) && typeof step.value !== 'string') ||
          (['press', 'expectText'].includes(step.action) && !step.value)) {
        throw new Error(id + ' has an invalid step at index ' + index)
      }
      return { action: step.action, selector: step.selector, value: step.value }
    })
    return { id, description, route, measure, steps: validated }
  })
}

async function runStep(page, { action, selector, value }) {
  const locator = page.locator(selector)
  switch (action) {
    case 'click': return locator.click()
    case 'fill': return locator.fill(value)
    case 'press': return locator.press(value)
    case 'expectVisible': return locator.waitFor({ state: 'visible' })
    case 'expectText': {
      const text = value.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&')
      return locator.filter({ hasText: new RegExp(text) }).waitFor({ state: 'visible' })
    }
  }
}

async function takeHeapSnapshot(session, path) {
  const file = openSync(path, 'wx')
  const writeChunk = ({ chunk }) => writeSync(file, chunk, null, 'utf8')
  session.on('HeapProfiler.addHeapSnapshotChunk', writeChunk)
  try {
    await session.send('HeapProfiler.takeHeapSnapshot')
  } finally {
    session.off('HeapProfiler.addHeapSnapshotChunk', writeChunk)
    closeSync(file)
  }
}

async function verifyRun(browser, scenario, url, directory, options) {
  const context = await browser.newContext(options.video ? { recordVideo: { dir: directory } } : {})
  context.setDefaultTimeout(8000)
  const result = { passed: false, stepsPassed: 0, metricMs: null, pageErrors: [], captureErrors: [], artifacts: {} }
  let traceStarted = false
  let video
  const capture = async (name, file, run) => {
    try {
      await run(file)
      result.artifacts[name] = file
    } catch (error) {
      result.captureErrors.push({ name, message: error.message })
    }
  }
  try {
    await context.tracing.start({ screenshots: true, snapshots: true })
    traceStarted = true
    const page = await context.newPage()
    video = page.video()
    page.on('pageerror', error => result.pageErrors.push(error.message))
    const cdp = options.cpu || options.heap ? await context.newCDPSession(page) : null
    let profiling = false
    try {
      if (options.cpu) {
        await cdp.send('Profiler.enable')
        await cdp.send('Profiler.start')
        profiling = true
      }
      const start = performance.now()
      const response = await page.goto(url.href, { waitUntil: 'domcontentloaded' })
      if (!response?.ok()) throw new Error('Navigation returned HTTP ' + (response?.status() ?? 'unknown'))
      for (const step of scenario.steps) {
        await runStep(page, step)
        result.stepsPassed += 1
      }
      result.flowMs = performance.now() - start
      result.metricMs = scenario.measure
        ? await page.evaluate(name => performance.getEntriesByName(name, 'measure').at(-1)?.duration ?? null, scenario.measure)
        : result.flowMs
      if (!Number.isFinite(result.metricMs) || result.metricMs <= 0) throw new Error('Requested timing is missing or zero.')
      result.passed = true
    } catch (error) {
      result.error = error.message
    } finally {
      if (profiling) {
        await capture('cpu', join(directory, 'cpu.cpuprofile'), async file => {
          const { profile } = await cdp.send('Profiler.stop')
          await writeFile(file, JSON.stringify(profile))
        })
      }
      await capture('screenshot', join(directory, 'final.png'), path => page.screenshot({ path }))
      if (options.heap) {
        await capture('heap', join(directory, 'heap.heapsnapshot'), path => takeHeapSnapshot(cdp, path))
      }
    }
  } catch (error) {
    result.passed = false
    result.error ??= error.message
  } finally {
    if (traceStarted) {
      await capture('trace', join(directory, 'trace.zip'), path => context.tracing.stop({ path }))
    }
    await context.close()
  }
  if (video) {
    try {
      const file = await video.path()
      await access(file)
      result.artifacts.video = file
    } catch (error) {
      result.captureErrors.push({ name: 'video', message: error.message })
    }
  }
  result.passed &&= result.captureErrors.length === 0
  return result
}

export async function verify(map, id, options) {
  if (!options['base-url'] || !options.out) throw new Error('verify needs --base-url and --out.')
  const runs = Number(options.runs)
  if (!Number.isInteger(runs) || runs < 1 || runs > 30) throw new Error('--runs must be an integer from 1 to 30.')
  if (options.channel && !['msedge', 'chrome'].includes(options.channel)) throw new Error('Use --channel msedge or chrome.')
  const scenario = (await readFeatureMap(map)).find(feature => feature.id === id)
  if (!scenario) throw new Error('Unknown feature: ' + id)
  const baseUrl = new URL(options['base-url'])
  const url = new URL(scenario.route, baseUrl)
  if (!['http:', 'https:'].includes(url.protocol) || url.origin !== baseUrl.origin) {
    throw new Error('Use an HTTP(S) base URL and a route on the same origin.')
  }
  const { chromium } = require('playwright')
  const out = resolve(options.out)
  await mkdir(dirname(out), { recursive: true })
  await mkdir(out)
  const browser = await chromium.launch({ channel: options.channel, headless: true })
  const report = {
    version: 1,
    feature: scenario.id,
    scenarioHash: createHash('sha256').update(JSON.stringify(scenario)).digest('hex'),
    metric: scenario.measure ?? 'browser-flow-wall-time',
    url: url.href,
    environment: {
      browser: browser.version(), channel: options.channel ?? 'chromium',
      cpuModel: cpus()[0]?.model, platform: process.platform, arch: process.arch, node: process.version,
      cpuProfile: Boolean(options.cpu), heapSnapshot: Boolean(options.heap), video: Boolean(options.video),
    },
    runs: [],
  }
  try {
    for (let index = 1; index <= runs; index++) {
      const directory = join(out, 'run-' + index)
      await mkdir(directory)
      report.runs.push(await verifyRun(browser, scenario, url, directory, options))
    }
  } finally {
    await browser.close()
  }
  report.passed = report.runs.every(run => run.passed)
  report.reportPath = join(out, 'report.json')
  await writeFile(report.reportPath, JSON.stringify(report, null, 2) + '\n')
  return report
}
