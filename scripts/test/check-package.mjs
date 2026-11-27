import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = fileURLToPath(new URL('../..', import.meta.url))

function readJson(path) {
  try {
    return JSON.parse(readFileSync(join(root, path), 'utf8'))
  } catch (error) {
    throw new Error(`${path}: ${error.message}`, { cause: error })
  }
}

function checkManifests() {
  const { name, version } = readJson('plugin.json')
  assert(typeof name === 'string' && name.trim(), 'plugin.json needs a name')
  assert(typeof version === 'string' && version.trim(), 'plugin.json needs a version')

  for (const path of [
    '.codex-plugin/plugin.json',
    '.claude-plugin/plugin.json',
    '.antigravity-plugin/plugin.json',
    'gemini-extension.json',
  ]) {
    const manifest = readJson(path)
    assert.equal(manifest.name, name, `${path} must use the name from plugin.json`)
    assert.equal(manifest.version, version, `${path} must use the version from plugin.json`)
  }

  for (const path of ['.agents/plugins/marketplace.json', '.claude-plugin/marketplace.json']) {
    const { plugins } = readJson(path)
    assert(Array.isArray(plugins), `${path} needs a plugins list`)
    const entries = plugins.filter(entry => entry?.name === name)
    assert.equal(entries.length, 1, `${path} must list ${name} exactly once`)

    const { source } = entries[0]
    let sourcePath = source
    if (path === '.agents/plugins/marketplace.json') {
      assert.equal(source?.source, 'local', `${path} must install the local plugin`)
      sourcePath = source.path
    }
    assert(typeof sourcePath === 'string' && sourcePath.startsWith('./') &&
      resolve(root, sourcePath) === resolve(root), `${path} must install from the repository root`)
  }
}

function checkSkills() {
  const directories = readdirSync(join(root, 'skills'), { withFileTypes: true })
    .filter(entry => entry.isDirectory())
  assert(directories.length > 0, 'skills/ must contain at least one skill')

  for (const directory of directories) {
    const path = `skills/${directory.name}/SKILL.md`
    const skill = readFileSync(join(root, path), 'utf8')
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(skill)
    assert(frontmatter, `${path} must start with YAML frontmatter`)

    let metadata
    try {
      metadata = parse(frontmatter[1])
    } catch (error) {
      throw new Error(`${path}: ${error.message}`, { cause: error })
    }
    assert.equal(metadata?.name, directory.name, `${path} name must match its directory`)
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.name) && metadata.name.length <= 64,
      `${path} name must use lowercase ASCII letters, digits and single hyphens, up to 64 characters`)
    const { description } = metadata
    assert(typeof description === 'string' && description.trim() && description.length <= 1024,
      `${path} needs a description of 1 to 1024 characters`)

    const translationPath = `skills/${directory.name}/references/vi.md`
    const translation = readFileSync(join(root, translationPath), 'utf8')
    assert(skill.slice(frontmatter[0].length).includes('](references/vi.md)'),
      `${path} must link to its Vietnamese instructions`)
    assert(translation.includes('](../SKILL.md)'), `${translationPath} must link to SKILL.md`)
  }

  return directories.length
}

checkManifests()
const skillCount = checkSkills()
console.log(`Checked ${skillCount} bilingual skills, four host manifests and two marketplaces.`)
