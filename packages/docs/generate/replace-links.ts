import * as fs from 'fs';

const filename = 'docs/03-API Reference/02-Hooks.mdx'

const hooks = fs.readFileSync(filename, {encoding: 'utf-8'})

const modelsLink = (value: string) => `/docs/API%20Reference/Models#${value.toLowerCase()}`
const hooksLink = (value: string) => `/docs/API%20Reference/Models#${value.toLowerCase()}`

const linkMap = {
  'Call': modelsLink('Call'),
  'QueryParams': modelsLink('QueryParams'),
  'ChainCall': modelsLink('ChainCall'),
  'RawCall': modelsLink('RawCall'),
  'CallResult': modelsLink('CallResult'),
  'ContractCall': modelsLink('ContractCall'),
  'RawCallResult': modelsLink('RawCallResult'),
  'Config': modelsLink('Config'),
  'TransactionStatus': modelsLink('TransactionStatus'),
  'TransactionOptions': modelsLink('TransactionOptions'),
  'TokenInfo': modelsLink('TokenInfo'),
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

const link = (value: string) => `{@link ${value}}`
const ahref = (title: string, link: string) => `<a href="${link}">${title}</a>`
const code = (value: string) => `<code>${value}</code>`

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
let replaced = hooks
  .replaceAll(link('Call'), createLink('Call'))
  .replaceAll(link('QueryParams'), createLink('QueryParams'))
  .replaceAll(link('ChainCall'), createLink('ChainCall'))
  .replaceAll(link('RawCall'), createLink('RawCall'))
  .replaceAll(link('CallResult'), createLink('CallResult'))
  .replaceAll(link('useCall'), createLink('useCall'))
  .replaceAll(link('useCalls'), createLink('useCalls'))
  .replaceAll(link('useRawCall'), createLink('useRawCall'))
  .replaceAll(link('useRawCalls'), createLink('useRawCalls'))
  .replaceAll(link('useChainCall'), createLink('useChainCall'))
  .replaceAll(link('useChainCalls'), createLink('useChainCalls'))
  .replaceAll(link('ContractCall'), createLink('ContractCall'))
  .replaceAll(link('RawCallResult'), createLink('RawCallResult'))
  .replaceAll(link('useContractFunction'), createLink('useContractFunction'))
  .replaceAll(link('useSendTransaction'), createLink('useSendTransaction'))
  .replaceAll(link('Config'), createLink('Config'))
  .replaceAll(link('TransactionStatus'), createLink('TransactionStatus'))
  .replaceAll(link('TransactionOptions'), createLink('TransactionOptions'))
  .replaceAll(link('TokenInfo'), createLink('TokenInfo'))

/**
 * Those paragraphs are generated all over the place but they only cause trouble.
 */
replaced = replaced
  .replaceAll('<p>', '')
  .replaceAll('</p>', '')

/**
 * HTML code tags also cause trouble sometimes, we can use markdown format.
 */
replaced = replaced
  .replaceAll('<pre class="prettyprint source"><code>', "\n```\n")
  .replaceAll('<pre class="prettyprint source lang-ts"><code>', "\n```tsx\n")
  .replaceAll('<pre class="prettyprint source lang-tsx"><code>', "\n```tsx\n")
  .replaceAll('</code></pre>', '```')

fs.writeFileSync(filename, replaced)
