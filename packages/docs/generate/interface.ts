import { CommentTag } from 'typedoc'
import { Child, isDeprecated, isExperimental, newLine, shortText, text } from './helpers'

export const interfaceFields = (child: Child) => {
  const properties = child.children?.filter((value) => value.kindString === 'Property') ?? []
  const methods = child.children?.filter((value) => value.kindString === 'Method') ?? []
  const fields = [...properties, ...methods].sort((a, b) => a.name.localeCompare(b.name))
  if (fields.length === 0) return ''

  return (
    `**Fields**\n\n` +
    fields
      .map(
        (field) =>
          (field.kindString === 'Property' ? property(field) : method(field)) +
          fieldFlags(field) +
          fieldDefaultValue(field) +
          fieldExamples(field)
      )
      .map(newLine)
      .join('')
  )
}

const property = (value: Child) => {
  let type = value.type?.toString()
  if (type === 'undefined | null | string | false | 0') type = 'string | Falsy'
  if (type?.match(/Parameters/) !== null) type = 'any[]'
  if (type === 'T') type = 'Contract'
  if (type === 'MN' || type === 'EN') type = 'string'
  const typeString = type ? `: ${type}` : ''
  const shortTextValue = shortText(value)
  const textValue = text(value).split('\n').join('\n  ')

  const baseInfo =
    `- \`${value.name}${typeString}\`` +
    (shortTextValue ? ` - ${shortTextValue}` : '') +
    (textValue ? `\n  ${textValue}` : '') +
    '\n'

  return baseInfo
}

const method = (value: Child) => {
  const type = getMethodType(value)
  const typeString = type ? `: ${type}` : ''
  const shortTextValue = value.signatures?.[0].comment?.shortText
  const textValue = value.signatures?.[0].comment?.text.split('\n').join('\n  ')

  const baseInfo =
    `- \`${value.name}${typeString}\`` +
    (shortTextValue ? ` - ${shortTextValue}` : '') +
    (textValue ? `\n\n  ${textValue}` : '') +
    '\n'

  return baseInfo
}

const fieldExample = (value: CommentTag) => {
  const content = value.text.trim().split('\n').join('\n  ')
  return '  ```tsx\n  ' + content + '\n  ```'
}

const fieldExamples = (child: Child) => {
  const examples = child.comment?.tags?.filter((tag) => tag.tagName === 'example') ?? []
  if (examples.length === 0) return ''
  return `  **_Example_**\n\n` + examples.map(fieldExample).join('\n') + '\n'
}

const fieldDefaultValue = (child: Child) => {
  const defaultValueLines = child.comment?.tags
    .filter((tag) => tag.tagName === 'defaultvalue')[0]
    ?.text.trim()
    .split('\n')
  if (!defaultValueLines) return ''
  const defaultValue = defaultValueLines?.join('\n  ')
  return '  **_Default value_**' + '\n\n' + '  ```tsx\n  ' + defaultValue + '\n  ```\n'
}

const fieldFlag = (message: string) => `  :::note\n\n  ${message}\n\n  :::`
const experimentalFieldFlag = fieldFlag('The flag is experimental and is not fully tested yet.')
const deprecatedFieldFlag = fieldFlag('The flag is deprecated and it is not recommended to use it.')

const fieldFlags = (child: Child) => {
  const flags = [] as string[]
  if (isDeprecated(child)) flags.push(deprecatedFieldFlag)
  if (isExperimental(child)) flags.push(experimentalFieldFlag)
  if (flags.length === 0) return ''
  return '  **_Flags:_**' + '\n\n' + flags.join('\n  ') + '\n'
}

const getMethodType = (child: Child) => {
  let result = '('

  child.signatures?.[0].parameters?.forEach((param, i) => {
    result += `${param.name}: ${param.type?.toString()}`
    if (i < (child.signatures?.[0].parameters?.length as number) - 1) result += ', '
  })

  result += ') => '
  result += child.signatures?.[0].type?.toString()
  return result
}
