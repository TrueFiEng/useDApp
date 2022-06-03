const modelsLink = (value: string) => `/docs/API%20Reference/Models#${value.toLowerCase()}`
const hooksLink = (value: string) => `/docs/API%20Reference/Hooks#${value.toLowerCase()}`

;(String.prototype as any).replaceAll = (String.prototype as any).replaceAll ?? function(subStr, newSubStr) {
  return this.replace(new RegExp(subStr, 'g'), newSubStr);
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
  'TokenInfo',
  'TypedFilter',
  'LogQueryParams',
  'LogsResult',
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
  'useSendTransaction',
  'useLogs',
  'useRawLogs',
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
export const replaceLinks = (content: string) => {
  let newContent = content;
  [
    ...models,
    ...hooks
  ].forEach(linked => {
    newContent = newContent.replaceAll(
      `{@link ${linked}}`,
      createLink(linked)
    )
  })

  const linksLeft = newContent.match(/{@link (.*)}/g)
  if (linksLeft?.length > 0) {
    console.log('Not replaced links:')
    linksLeft.forEach(link => console.log(link))
    throw new Error('Links left not replaced.')
  }
  return newContent
}
