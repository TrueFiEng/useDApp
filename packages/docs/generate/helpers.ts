import { CommentTag, DeclarationReflection, ParameterReflection } from 'typedoc'

export type Child = DeclarationReflection

export const newLine = (value: string | undefined) => (value ? `${value}\n` : '')
export const isFunctionDeprecated = (child: Child) =>
  child.signatures?.[0]?.comment?.tags?.some((tag) => tag.tagName === 'deprecated')

export const title = (child: Child) => {
  if (child.name === 'FullConfig') return '## Config'
  const value = isFunctionDeprecated(child)
    ? `## <del>${child.name}</del>\n**Deprecated**: ${
        child.signatures?.[0]?.comment?.tags?.find((tag) => tag.tagName === 'deprecated')?.text
      }`
    : `## ${child.name}`
  return newLine(value)
}

export const functionDescription = (child: Child) => {
  const shortText = child.signatures?.[0]?.comment?.shortText ?? ''
  const text = child.signatures?.[0]?.comment?.text ?? ''
  return `${newLine(shortText)}${text}`
}

const parameter = (value: ParameterReflection) => {
  let type = value.type?.toString()
  if (type === 'undefined | null | string | false | 0') type = 'string | Falsy' // Unwanted expansion on typedoc side.
  const typeString = type ? `: ${type}` : ''
  const description = value.comment?.shortText
  return `- \`${value.name}${typeString}\` - ${description}`
}

export const parameters = (child: Child) => {
  const values = (child.signatures?.[0]?.parameters ?? []).filter((value) => !!value.comment?.shortText) // Do not list parameters without any description.
  if (values.length === 0) return undefined
  return `\n**Parameters**\n` + values.map(parameter).join('\n') + '\n'
}

export const example = (value: CommentTag) => {
  return '```tsx\n' + value.text.trim() + '\n```'
}

export const functionExamples = (child: Child) => {
  const examples = child.signatures?.[0]?.comment?.tags?.filter((tag) => tag.tagName === 'example') ?? []
  if (examples.length === 0) return undefined
  return `\n**Example**\n` + examples.map(example).join('\n') + '\n'
}

export const examples = (child: Child) => {
  const examples = child.comment?.tags?.filter((tag) => tag.tagName === 'example') ?? []
  if (examples.length === 0) return undefined
  return `\n**_Example_**\n` + examples.map(example).join('\n') + '\n'
}

export const functionSee = (child: Child) => {
  const seeRecords = child.signatures?.[0]?.comment?.tags?.filter((tag) => tag.tagName === 'see') ?? []
  if (seeRecords.length === 0) return undefined
  return seeRecords.map((seeRecord) => `\n**See:** ${seeRecord.text}`).join('\n') + '\n'
}

export const returns = (child: Child) => {
  const value = child.signatures?.[0]?.comment?.returns
  return value ? `\n**Returns**: ${value}` : undefined
}

export const isDeprecated = (child: Child) => child.comment?.tags?.some((tag) => tag.tagName === 'deprecated')
export const isExperimental = (child: Child) => child.comment?.tags?.some((tag) => tag.tagName === 'experimental')

export const isModel = (child: Child) => {
  if (child.kindString === 'Interface') return true
  if (child.kindString === 'Type alias') return true
  if (child.kindString === 'Class') return true
  return false
}

export const shortText = (child: Child) => {
  const shortText = child.comment?.shortText.trim() ?? ''
  return newLine(shortText)
}

export const text = (child: Child) => {
  const text = child.comment?.text.trim() ?? ''
  return newLine(text)
}

export const defaultValue = (child: Child) => {
  const defaultValue = child.comment?.tags.filter((tag) => tag.tagName === 'defaultvalue')[0]?.text.trim()
  if (!defaultValue) return ''
  return '**_Default value:_**' + '\n\n```tsx\n' + defaultValue + '\n```\n'
}
