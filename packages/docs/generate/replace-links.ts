const modelsLink = (value: string) => `/docs/API%20Reference/Models#${value.toLowerCase()}`
const hooksLink = (value: string) => `/docs/API%20Reference/Hooks#${value.toLowerCase()}`
const constantsLink = (value: string) => `/docs/API%20Reference/Constants#${value.toLowerCase()}`

/**
 * Can be linked to under API Reference / Models page.
 */
const models = [
  'Call',
  'Chain',
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

/**
 * Can be linked to under API Reference / Constants page.
 */
const constants = ['ChainId']

const ahref = (title: string, link: string) => `[${title}](${link})`
// const ahref = (title: string, link: string) =>  `<a href="${link}">${title}</a>`

const createLink = (value: string) => {
  if (value.startsWith('http')) {
    const url = new URL(value)
    const splittedBySlash = url.pathname.split('/')
    const title = url.hash.replace('#', '') || splittedBySlash[splittedBySlash.length - 1] || url.hostname
    return ahref((title || value) as string, value)
  }
  if (hooks.includes(value)) return ahref(value, hooksLink(value))
  if (models.includes(value)) return ahref(value, modelsLink(value))
  if (constants.includes(value)) return ahref(value, constantsLink(value))
  throw new Error(`Could not find how to link to "${value}".`)
}

/**
 * Replace the {@link xxx} documentation that works in IDEs.
 * We need to point to a documentation link where the linked entity lives.
 */
export const replaceLinks = (content: string | undefined) => {
  const linkRegex = /{@link (.*)}/g
  // extract all links
  const links = content?.match(linkRegex) ?? []

  // replace all links
  let newContent = content
  links.forEach((link) => {
    const linked = link.split('{@link ')[1].split('}')[0]
    const newLink = createLink(linked || link)
    newContent = newContent?.replace(link, newLink)
  })

  const linksLeft = newContent?.match(/{@link (.*)}/g)
  if (linksLeft?.length && linksLeft?.length > 0) {
    console.log('Not replaced links:')
    linksLeft.forEach((link) => console.log(link))
    throw new Error('Links left not replaced.')
  }
  return newContent
}
