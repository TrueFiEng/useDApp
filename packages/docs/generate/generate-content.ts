import * as fs from 'fs'
import { Application, TypeDocReader, TSConfigReader } from 'typedoc'
import {
  Child,
  functionDescription,
  functionSee,
  title,
  newLine,
  parameters,
  returns,
  functionExamples,
  isModel,
  defaultValue,
  text,
  shortText,
  examples,
} from './helpers'
import { interfaceFields } from './interface'
import { replaceLinks } from './replace-links'

const app = new Application()
app.options.addReader(new TypeDocReader())
app.options.addReader(new TSConfigReader())

app.bootstrap({
  entryPoints: ['../core/src'],
  tsconfig: '../core/tsconfig.json',
  emit: false,
})

const project = app.convert()
const hooksOutFilename = 'docs/03-API Reference/02-Hooks.mdx'
const modelsOutFilename = 'docs/03-API Reference/03-Models.mdx'

const hookModel = (child: Child): string => {
  return [
    title(child),
    functionDescription(child),
    parameters(child),
    returns(child),
    functionExamples(child),
    functionSee(child),
  ]
    .map(newLine)
    .join('')
}

const interfaceModel = (child: Child): string => {
  return [title(child), shortText(child), interfaceFields(child), text(child), defaultValue(child), examples(child)]
    .map(newLine)
    .join('')
}

const typeOrClassModel = (child: Child): string => {
  return [title(child), shortText(child), text(child), defaultValue(child), examples(child)].map(newLine).join('')
}

let hooksContent = project?.children
  ?.filter((child) => child.flags.isPublic)
  .filter((child) => child.kindString === 'Function' && child.name.startsWith('use')) // Only hooks.
  .map((child) => hookModel(child))
  .join('')
hooksContent = replaceLinks(hooksContent)

fs.writeFileSync(hooksOutFilename, hooksContent)

const models = project?.children
  ?.filter((child) => child.flags.isPublic && isModel(child))
  .sort((a, b) => a.name.localeCompare(b.name))

let modelsContent = models
  ?.map((model) => (model.kindString === 'Interface' ? interfaceModel(model) : typeOrClassModel(model)))
  .map(newLine)
  .join('')

modelsContent = replaceLinks(modelsContent)

fs.writeFileSync(modelsOutFilename, modelsContent)
