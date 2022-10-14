import * as fs from 'fs'
import { CommentTag, DeclarationReflection, Application, TypeDocReader, TSConfigReader } from 'typedoc'
import { replaceLinks } from './replace-links'

const app = new Application()
app.options.addReader(new TypeDocReader())
app.options.addReader(new TSConfigReader())

app.bootstrap({
  entryPoints: ['../core/src'],
  tsconfig: '../core/tsconfig.json',
  emit: false,
})

const data = app.convert()
const outFilename = 'docs/03-API Reference/03-Models.mdx'
type Child = DeclarationReflection

const newLine = (value: string | undefined) => (value ? `${value}\n` : '')

function shouldBeDocumented(child: Child) {
  if (child.name === 'Config') return false

  if (child.flags.isPublic) {
    if (child.kindString === 'Interface') return true
    if (child.kindString === 'Type alias') return true
    if (child.kindString === 'Class') return true
  }
  return false
}

const isDeprecated = (child: Child) => child.comment?.tags?.some((tag) => tag.tagName === 'deprecated')
const isExperimental = (child: Child) => child.comment?.tags?.some((tag) => tag.tagName === 'experimental')

const fieldFlag = (message: string) => `  :::note\n\n  ${message}\n\n  :::`
const experimentalFieldFlag = fieldFlag('The flag is experimental and is not fully tested yet.')
const deprecatedFieldFlag = fieldFlag('The flag is deprecated and it is not recommended to use it.')

const title = (child: Child) => newLine(`## ${child.name !== 'FullConfig' ? child.name : 'Config'}`)

const shortText = (child: Child) => {
  const shortText = child.comment?.shortText ?? ''
  return shortText
}

const text = (child: Child) => {
  const text = child.comment?.text ?? ''
  return text
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

const property = (value: Child) => {
  let type = value.type?.toString()
  if (type === 'undefined | null | string | false | 0') type = 'string | Falsy'
  if (type?.match(/Parameters/) !== null) type = 'any[]'
  if (type === 'T') type = 'Contract'
  if (type === 'MN' || type === 'EN') type = 'string'
  const typeString = type ? `: ${type}` : ''
  const shortTextValue = shortText(value)
  const textValue = text(value)

  const baseInfo = `- \`${value.name}${typeString}\`${shortTextValue ? ` - ${shortTextValue}` : ''}${
    textValue ? `\n${textValue}` : ''
  }`

  return baseInfo
}

const fieldExample = (value: CommentTag) => {
  const content = value.text.split('\n').join('\n  ')
  return '  ```tsx' + content + '```'
}

const fieldExamples = (child: Child) => {
  const examples = child.comment?.tags?.filter((tag) => tag.tagName === 'example') ?? []
  if (examples.length === 0) return ''
  return `\n\n  **_Example_**\n\n` + examples.map(fieldExample).join('\n') + '\n'
}

const fieldDefaultValue = (child: Child) => {
  const defaultValueLines = child.comment?.tags
    .filter((tag) => tag.tagName === 'defaultvalue')[0]
    ?.text.trim()
    .split('\n')
  if (!defaultValueLines) return ''
  // console.log({ defaultValueLines: defaultValueLines })
  // .filter((line) => line !== '')
  const defaultValue = defaultValueLines?.join('\n  ')
  return newLine(`\n\n  **_Default value:_**\n\n  \`\`\`tsx\n  ${defaultValue}\n  \`\`\``)
  // if (defaultValueLines?.length === 1) {
  // }
  // return newLine(`\n\n  **_Default value:_**\n\n  \`\`\`tsx\n  ${defaultValue}\n  \`\`\``)
}

const method = (value: Child) => {
  const type = getMethodType(value)
  const typeString = type ? `: ${type}` : ''
  const shortTextValue = shortText(value)
  const textValue = text(value)

  const baseInfo = `- \`${value.name}${typeString}\`${shortTextValue ? ` - ${shortTextValue}` : ''}${
    textValue ? `\n\n${textValue}` : ''
  }`

  return baseInfo
}

const flags = (child: Child) => {
  const flags = [] as string[]
  if (isDeprecated(child)) flags.push(deprecatedFieldFlag)
  if (isExperimental(child)) flags.push(experimentalFieldFlag)
  if (flags.length === 0) return ''
  return `\n\n  **_Flags:_**\n\n${flags.join('\n  ')}`
}

const interfaceFields = (child: Child) => {
  const properties = child.children?.filter((value) => value.kindString === 'Property') ?? []
  const methods = child.children?.filter((value) => value.kindString === 'Method') ?? []
  const fields = [...properties, ...methods].sort((a, b) => a.name.localeCompare(b.name))
  if (fields.length === 0) return ''
  return (
    `\n**Fields**\n\n` +
    fields
      .map(
        (field) =>
          (field.kindString === 'Property' ? property(field) : method(field)) +
          flags(field) +
          fieldDefaultValue(field) +
          fieldExamples(field)
      )
      .join('\n')
  )
}

const example = (value: CommentTag) => {
  return '\n```tsx\n' + value.text + '\n```\n'
}

const examples = (child: Child) => {
  const examples = child.comment?.tags?.filter((tag) => tag.tagName === 'example') ?? []
  if (examples.length === 0) return undefined
  return `\n**Example**\n` + examples.map(example).join('\n') + '\n'
}

const interfaceModel = (child: Child): string => {
  return [title(child), shortText(child), interfaceFields(child), text(child), examples(child)].map(newLine).join('')
}

const typeOrClassModel = (child: Child): string => {
  return [title(child), shortText(child), text(child), examples(child)].map(newLine).join('')
}

// const chains = data?.children?.filter((child) => child.type?.toString() === 'Chain')
// chains?.forEach((chain) => {
//   console.log(chain.name)
// })
// const chain = data?.children?.filter((child) => child.name === 'Chain')?.at(0) as Child
// const fullConfig = data?.children?.filter((child) => child.name === 'FullConfig')?.at(0) as Child
// const foo = data?.children?.filter((child) => child.name === 'foo')?.at(0) as Child | undefined

// let fullConfigModel = interfaceModel(fullConfig)
// fullConfigModel = replaceLinks(fullConfigModel)
// console.log(fullConfigModel)
// console.log(interfaceModel(chain))
// console.log(foo.comment)
// console.log('=========================')
// console.log(contractCall.signatures?.at(0))

const models = data?.children?.filter(shouldBeDocumented).sort((a, b) => a.name.localeCompare(b.name))

let modelsContent = models
  ?.map((model) => (model.kindString === 'Interface' ? interfaceModel(model) : typeOrClassModel(model)))
  .map(newLine)
  .join('') as string

modelsContent = replaceLinks(modelsContent) as string

fs.writeFileSync(outFilename, modelsContent)
