import * as fs from 'fs';
import type {CommentTag, ContainerReflection, DeclarationReflection, ParameterReflection} from 'typedoc'
import { replaceLinks } from './replace-content';

const outFilename = 'docs/03-API Reference/07-Hooks-JSON.mdx'
const json = fs.readFileSync('generate/hooks.gen.json', {encoding: 'utf-8'})
const hooks = JSON.parse(json) as ContainerReflection
type Child = DeclarationReflection

const isDeprecated = (child: Child) =>
  child.signatures[0]?.comment?.tags?.some(tag => (tag as any).tag === 'deprecated')

const newLine = (value: string | undefined) => value ? `${value}\n` : ''

const title = (child: Child) => {
  const value = isDeprecated(child) ? `## <del>${child.name}</del>` : `## ${child.name}`
  return newLine(value)
}

const description = (child: Child) => {
  const shortText = child.signatures[0]?.comment?.shortText ?? ''
  const text = child.signatures[0]?.comment?.text ?? ''
  return `${newLine(shortText)}${text}`
}

const parameter = (value: ParameterReflection) => {
  let content = `- \`${value.name}\``
  let description = value.comment?.shortText
  content = content + ` - ${description}`
  return content
}

const parameters = (child: Child) => {
  const values = (child.signatures[0]?.parameters ?? [])
    .filter(value => !!value.comment?.shortText) // Do not list parameters without any description.
  if (values.length === 0) return undefined
  return `**Parameters**\n` +
    values.map(parameter).join('\n') + '\n'
}

const example = (value: CommentTag) => {
  return '```tsx\n' + value.text + '\n```\n'
}

const examples = (child: Child) => {
  const examples = child.signatures[0]?.comment?.tags?.filter(tag => (tag as any).tag === 'example') ?? []
  if (examples.length === 0) return undefined
  return `**Example**\n` +
    examples.map(example).join('\n') + '\n'
}

const returns = (child: Child) => {
  const value = child.signatures[0]?.comment?.returns
  return value ? `**Returns**: ${value}` : undefined
}

const entry = (child: Child): string => {
  return [
    title(child),
    description(child),
    parameters(child),
    returns(child),
    examples(child),
  ].map(newLine).join('')
}

let content = hooks.children
  .filter(child => child.flags.isPublic)
  .filter(child => child.kindString === 'Function') // Only hooks.
  .map(child => entry(child)).join('')


content = replaceLinks(content)
fs.writeFileSync(outFilename, content)
