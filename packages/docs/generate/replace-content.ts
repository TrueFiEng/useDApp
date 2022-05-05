import * as fs from 'fs';

const filename = 'docs/03-API Reference/02-Hooks.mdx'
const modelsLink = (value: string) => `/docs/API%20Reference/Models#${value.toLowerCase()}`
const hooksLink = (value: string) => `/docs/API%20Reference/Hooks#${value.toLowerCase()}`
let fileContent = fs.readFileSync(filename, {encoding: 'utf-8'})

;(String.prototype as any).replaceAll = (String.prototype as any).replaceAll ?? function(subStr, newSubStr) {
  this.replace(new RegExp(subStr, 'g'), newSubStr);
}

/**
 * Can be linked to under API Reference / Models page.
 */
const models = [
  'Call',
  'QueryParams',
  'ChainCall',
  'RawCall',
  'CallResult',
  'ContractCall',
  'RawCallResult',
  'Config',
  'TransactionStatus',
  'TransactionOptions',
  'TokenInfo'
]

/**
 * Can be linked to under API Reference / Hooks page.
 */
const hooks = [
  'useCall',
  'useCalls',
  'useRawCall',
  'useRawCalls',
  'useChainCall',
  'useChainCalls',
  'ContractCall',
  'useContractFunction',
  'useSendTransaction'
]

const ahref = (title: string, link: string) => `<a href="${link}">${title}</a>`
const createLink = (value: string) => {
  if (value.startsWith('use')) {
    return ahref(value, hooksLink(value))
  }
  if (models.includes(value)) return ahref(value, modelsLink(value))
  throw new Error(`Could not find how to link to "${value}".`)
}

/**
 * Replace the {@link xxx} documentation that works in IDEs.
 * We need to point to a documentation link where the linked entity lives.
 */
[
  ...models,
  ...hooks
].forEach(linked => {
  fileContent = fileContent.replaceAll(
    `{@link ${linked}}`,
    createLink(linked)
  )
})

/**
 * Those paragraphs are generated all over the place but they only cause trouble.
 */
 fileContent = fileContent
  .replaceAll('<p>', '')
  .replaceAll('</p>', '')

/**
 * HTML code tags also cause trouble sometimes, we can use markdown format.
 */
 fileContent = fileContent
  .replaceAll('<pre class="prettyprint source"><code>', "\n```\n")
  .replaceAll('<pre class="prettyprint source lang-ts"><code>', "\n```tsx\n")
  .replaceAll('<pre class="prettyprint source lang-tsx"><code>', "\n```tsx\n")
  .replaceAll('</code></pre>', '```')

fs.writeFileSync(filename, fileContent)
