import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, relative, resolve, isAbsolute, sep } from 'node:path'

const require = createRequire(import.meta.url)

function isWithin(directory, file) {
  const path = relative(directory, file)
  return path === '' || (!isAbsolute(path) && path !== '..' && !path.startsWith('..' + sep))
}

function importSpecifiers(ts, source) {
  const specifiers = []
  const add = node => {
    if (node && ts.isStringLiteralLike(node)) specifiers.push(node.text)
  }
  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      const { importClause } = node
      const bindings = importClause?.namedBindings
      const allTypeOnly = !importClause?.name && bindings && ts.isNamedImports(bindings)
        && bindings.elements.length && bindings.elements.every(element => element.isTypeOnly)
      if (!importClause?.isTypeOnly && !allTypeOnly) add(node.moduleSpecifier)
    } else if (ts.isExportDeclaration(node)) {
      const clause = node.exportClause
      const allTypeOnly = clause && ts.isNamedExports(clause)
        && clause.elements.length && clause.elements.every(element => element.isTypeOnly)
      if (!node.isTypeOnly && !allTypeOnly) add(node.moduleSpecifier)
    } else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) {
      if (!node.isTypeOnly) add(node.moduleReference.expression)
    } else if (ts.isCallExpression(node) &&
        (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
         (ts.isIdentifier(node.expression) && node.expression.text === 'require'))) {
      add(node.arguments[0])
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return specifiers
}

function findViolations(edges, from, to) {
  const parents = new Map([...edges.keys()].map(file => [file, []]))
  for (const [file, dependencies] of edges) {
    for (const dependency of dependencies) parents.get(dependency).push(file)
  }
  const queue = [...edges.keys()].filter(file => isWithin(to, file))
  const next = new Map(queue.map(file => [file, null]))
  for (let index = 0; index < queue.length; index++) {
    for (const parent of parents.get(queue[index])) {
      if (!next.has(parent)) {
        next.set(parent, queue[index])
        queue.push(parent)
      }
    }
  }
  return queue.filter(file => isWithin(from, file)).sort().map(file => {
    const chain = []
    for (let hop = file; hop !== null; hop = next.get(hop)) chain.push(hop)
    return chain
  })
}

export async function checkBoundaries(configFile) {
  const root = dirname(resolve(configFile))
  const config = JSON.parse(await readFile(configFile, 'utf8'))
  if (typeof config.tsconfig !== 'string' || !Array.isArray(config.forbid) || !config.forbid.length) {
    throw new Error('Boundary config needs tsconfig and a non-empty forbid array.')
  }
  const rules = config.forbid.map(rule => {
    if (typeof rule?.from !== 'string' || !rule.from.trim() || typeof rule.to !== 'string' || !rule.to.trim()) {
      throw new Error('Each boundary rule needs from and to directory paths.')
    }
    const from = resolve(root, rule.from)
    const to = resolve(root, rule.to)
    if (!isWithin(root, from) || !isWithin(root, to) || isWithin(from, to) || isWithin(to, from)) {
      throw new Error('Boundary directories must be separate and inside the config project.')
    }
    return { from, to }
  })

  const compilerFile = resolve(root, config.tsconfig)
  if (!isWithin(root, compilerFile)) throw new Error('tsconfig must be in the boundary project.')
  const ts = require('typescript')
  const configuration = ts.readConfigFile(compilerFile, ts.sys.readFile)
  const displayError = diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
  if (configuration.error) throw new Error(displayError(configuration.error))
  const parsed = ts.parseJsonConfigFileContent(configuration.config, ts.sys, dirname(compilerFile), {}, compilerFile)
  if (parsed.errors.length) throw new Error(parsed.errors.map(displayError).join('\n'))
  const program = ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options })
  const sources = program.getSourceFiles().filter(source => !source.isDeclarationFile
    && isWithin(root, source.fileName) && !source.fileName.split(/[\\/]/).includes('node_modules'))
  const key = ts.sys.useCaseSensitiveFileNames ? file => resolve(file) : file => resolve(file).toLowerCase()
  const sourcePaths = new Map(sources.map(source => [key(source.fileName), resolve(source.fileName)]))
  const compilerCache = ts.createModuleResolutionCache(root, key, parsed.options)
  const unresolved = []
  const edges = new Map(sources.map(source => {
    const dependencies = importSpecifiers(ts, source).flatMap(specifier => {
      const match = ts.resolveModuleName(specifier, source.fileName, parsed.options, ts.sys, compilerCache).resolvedModule
      if (!match && (specifier.startsWith('./') || specifier.startsWith('../'))) {
        unresolved.push({ file: relative(root, source.fileName), specifier })
      }
      const path = match && sourcePaths.get(key(match.resolvedFileName))
      return path ? [path] : []
    })
    return [resolve(source.fileName), new Set(dependencies)]
  }))
  if (unresolved.length) throw new Error('Unresolved local imports: ' + JSON.stringify(unresolved))
  if (rules.some(({ from, to }) => ![...edges.keys()].some(file => isWithin(from, file)) ||
      ![...edges.keys()].some(file => isWithin(to, file)))) {
    throw new Error('Each boundary directory must contain at least one file in this TypeScript program.')
  }
  const violations = rules.flatMap(({ from, to }) => findViolations(edges, from, to)
    .map(chain => ({ from: relative(root, from), to: relative(root, to), chain: chain.map(file => relative(root, file)) })))
  return { scannedFiles: edges.size, rules: rules.length, violations }
}
