import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import GitHubSlugger from 'github-slugger'
import MarkdownIt from 'markdown-it'

const markdown = new MarkdownIt({ html: true })

function readDocument(file) {
  const tokens = markdown.parse(readFileSync(file, 'utf8'), {})
  const slugger = new GitHubSlugger()
  const anchors = new Set()
  const links = []
  let line = 1
  for (const [index, token] of tokens.entries()) {
    if (token.map) line = token.map[0] + 1
    if (token.type === 'heading_open') {
      const title = tokens[index + 1].children
        .filter(child => ['text', 'code_inline', 'image'].includes(child.type))
        .map(child => child.content)
        .join('')
      anchors.add(slugger.slug(title))
    }
    for (const child of token.children ?? [token]) {
      if (child.type === 'link_open') links.push({ href: child.attrGet('href'), line })
      if (child.type === 'image') links.push({ href: child.attrGet('src'), line })
      if (child.type === 'html_inline' || child.type === 'html_block') {
        for (const match of child.content.matchAll(/<a\b[^>]*?\s+href\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)) {
          const offset = child.content.slice(0, match.index).split('\n').length - 1
          links.push({ href: match[1] ?? match[2], line: line + offset })
        }
      }
    }
  }
  return { anchors, links }
}

export function checkMarkdownLinks(root) {
  const files = ['README.md', 'README.vi.md', 'CONTRIBUTING.md', 'scripts/README.md', 'scripts/README.vi.md']
    .map(file => join(root, file))
  for (const directory of ['docs', 'skills']) {
    files.push(...readdirSync(join(root, directory), { recursive: true, withFileTypes: true })
      .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
      .map(entry => join(entry.parentPath, entry.name)))
  }

  const documents = new Map(files.sort().map(file => [file, readDocument(file)]))
  const failures = []
  let count = 0
  for (const file of files) {
    for (const { href, line } of documents.get(file).links) {
      if (!href || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue
      count++

      const location = `${relative(root, file)}:${line}`
      const [path, fragment = ''] = href.split('#', 2)
      let localPath, heading
      try {
        localPath = decodeURIComponent(path.split('?')[0])
        heading = decodeURIComponent(fragment)
      } catch {
        failures.push(`${location} has invalid URL encoding: ${href}`)
        continue
      }
      const target = localPath.startsWith('/')
        ? resolve(root, '.' + localPath)
        : localPath ? resolve(dirname(file), localPath) : file
      const withinRepo = relative(root, target)
      if (isAbsolute(withinRepo) || withinRepo === '..' || withinRepo.startsWith('..' + sep) ||
          !existsSync(target)) {
        failures.push(`${location} links to a missing repository path: ${href}`)
        continue
      }
      if (heading && target.endsWith('.md')) {
        if (!documents.has(target)) documents.set(target, readDocument(target))
        if (!documents.get(target).anchors.has(heading)) {
          failures.push(`${location} links to a missing Markdown heading: ${href}`)
        }
      }
    }
  }
  if (failures.length) throw new Error(failures.join('\n'))
  return count
}
