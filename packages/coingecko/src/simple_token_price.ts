// get price from token contract
export const getCoingeckoSimpleTokenPriceUri = (contract: string, quoteId: string, platformId: string) =>
  `https://api.coingecko.com/api/v3/simple/token_price/${platformId}?contract_addresses=${contract}&vs_currencies=${quoteId}`

export const getCoingeckoTokenPriceFetch = (fetchFunction: any) => async (
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
    // return format {"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2":{"usd":2747.45}}
    const result = await data.json()
    const price = result[addr][quoteId]
    return price ? price + '' : undefined
  } catch (_) {
    return undefined
  }
}

export const getCoingeckoTokenPrice = getCoingeckoTokenPriceFetch(window && window.fetch)
