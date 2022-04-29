import * as fs from 'fs';

const filename = 'docs/03-API Reference/08-Hooks-generated.mdx'

const hooks = fs.readFileSync(filename, {encoding: 'utf-8'})

const map = {
  'Call': '/docs/API%20Reference/Models#call'
}

const link = (value: string) => `{@link ${value}}`
const code = (value: string) => `<code>${value}</code>`

const replaced = hooks
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

fs.writeFileSync(filename, replaced)
