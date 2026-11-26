import { isDeepStrictEqual } from 'node:util'

function median(values) {
  const sorted = values.toSorted((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2
}

function getStats(report) {
  if (!report.passed || !Array.isArray(report.runs) || report.runs.length < 3 ||
      !report.runs.every(run => run.passed && Number.isFinite(run.metricMs) && run.metricMs > 0)) {
    throw new Error('Each report needs at least three successful comparable runs.')
  }
  const measurements = report.runs.map(run => run.metricMs)
  const center = median(measurements)
  return {
    runs: measurements.length,
    medianMs: center,
    madMs: median(measurements.map(value => Math.abs(value - center))),
  }
}

export function compareReports(baselineReport, candidateReport, minPercent) {
  if (!Number.isFinite(minPercent) || minPercent < 0 || minPercent > 100) {
    throw new Error('--min-percent must be between 0 and 100.')
  }
  if (baselineReport?.version !== 1 || candidateReport?.version !== 1 ||
      !baselineReport.scenarioHash || baselineReport.scenarioHash !== candidateReport.scenarioHash ||
      baselineReport.metric !== candidateReport.metric ||
      !baselineReport.environment ||
      !isDeepStrictEqual(baselineReport.environment, candidateReport.environment)) {
    throw new Error('Reports must use the same scenario, metric and recorded environment.')
  }
  const baseline = getStats(baselineReport)
  const candidate = getStats(candidateReport)
  const differenceMs = baseline.medianMs - candidate.medianMs
  const improvementPercent = differenceMs / baseline.medianMs * 100
  const thresholdMs = Math.max(2 * baseline.madMs, 2 * candidate.madMs, baseline.medianMs * minPercent / 100)
  const verdict = Math.abs(differenceMs) <= thresholdMs ? 'inconclusive'
    : differenceMs > 0 ? 'improved' : 'regressed'
  return { metric: baselineReport.metric, baseline, candidate, differenceMs, improvementPercent, thresholdMs, verdict }
}
