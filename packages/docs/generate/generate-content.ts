import * as fs from 'fs';
import type {ContainerReflection, DeclarationReflection} from 'typedoc'

const outFilename = 'docs/03-API Reference/07-Hooks-JSON.mdx'
const json = fs.readFileSync('generate/hooks.gen.json', {encoding: 'utf-8'})
const hooks = JSON.parse(json) as ContainerReflection
type Child = DeclarationReflection

const isDeprecated = (child: Child) =>
  child.signatures[0]?.comment?.tags?.some(tag => (tag as any).tag === 'deprecated')

const newLine = (value: string | undefined) => value ? `${value}\n` : ''

const title = (child: Child) => {
  const value = isDeprecated(child) ? `## <del>${child.name}</del>` : `## ${child.name}`
  return value
}

const description = (child: Child) => {
  const shortText = child.signatures[0]?.comment?.shortText ?? ''
  const text = child.signatures[0]?.comment?.text ?? ''
  return `${newLine(shortText)}${text}`
}

const entry = (child: Child): string => {
  return [
    title(child),
    description(child)
  ].map(newLine).join('')
  // return title(child) + description(child)
}

let content = hooks.children
  .filter(child => child.flags.isPublic)
  .filter(child => child.kindString === 'Function') // Only hooks.
  .map(child => entry(child)).join('')


fs.writeFileSync(outFilename, content)
