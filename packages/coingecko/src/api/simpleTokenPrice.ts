// get price from token contract
export const getCoingeckoSimpleTokenPriceUri = (contracts: string, quoteId: string, platformId: string) =>
  `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contracts}&vs_currencies=${quoteId}`

export const fetchCoingeckoTokenPrice = (fetchFunction: any) => async (
  contract: string,
  quote: string,
  platform: string
) => {
  try {
    const addr = contract.toLowerCase()
    const quoteId = quote.toLowerCase()
    const platformId = platform.toLowerCase()
    const url = getCoingeckoSimpleTokenPriceUri(addr, quoteId, platformId)
    const data = await fetchFunction(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await data.json()
    const price = result[addr][quoteId]
    return price ? price + '' : undefined
  } catch (_) {
    return undefined
  }
}

export const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(typeof window !== 'undefined' && window.fetch)

export async function getCoingeckoTokenPrices (contracts: string[], quote: string, platform: string): Promise<number[]> {
  const url = getCoingeckoSimpleTokenPriceUri(contracts.join(','), quote, platform)
  const res = await fetch(url)
  const data = await res.json()
  return contracts.map(address => data[address][quote])
}