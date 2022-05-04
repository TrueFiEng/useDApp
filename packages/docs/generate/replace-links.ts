import * as fs from 'fs';

const filename = 'docs/03-API Reference/08-Hooks-generated.mdx'

const hooks = fs.readFileSync(filename, {encoding: 'utf-8'})

const map = {
  'Call': '/docs/API%20Reference/Models#call'
}

const link = (value: string) => `{@link ${value}}`
const code = (value: string) => `<code>${value}</code>`

/**
 * Replace the {@link xxx} documentation that works in IDEs.
 * We need to point to a documentation link where the linked entity lives.
 */
let replaced = hooks
  .replaceAll(link('Call'), `<a href="${map['Call']}">Call</a>`)
  .replaceAll(link('QueryParams'), code('QueryParams'))
  .replaceAll(link('ChainCall'), code('ChainCall'))
  .replaceAll(link('RawCall'), code('RawCall'))
  .replaceAll(link('CallResult'), code('CallResult'))
  .replaceAll(link('useCall'), code('useCall'))
  .replaceAll(link('useCalls'), code('useCalls'))
  .replaceAll(link('useRawCall'), code('useRawCall'))
  .replaceAll(link('useRawCalls'), code('useRawCalls'))
  .replaceAll(link('useChainCall'), code('useChainCall'))
  .replaceAll(link('useChainCalls'), code('useChainCalls'))
  .replaceAll(link('ContractCall'), code('ContractCall'))
  .replaceAll(link('RawCallResult'), code('RawCallResult'))
  .replaceAll(link('useContractFunction'), code('useContractFunction'))
  .replaceAll(link('useSendTransaction'), code('useSendTransaction'))
  .replaceAll(link('Config'), code('Config'))
  .replaceAll(link('TransactionStatus'), code('TransactionStatus'))
  .replaceAll(link('TransactionOptions'), code('TransactionOptions'))
  .replaceAll(link('TokenInfo'), code('TokenInfo'))

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
