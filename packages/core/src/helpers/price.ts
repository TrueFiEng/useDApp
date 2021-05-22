
export async function adapterCoinGecko(token: string, quote: string) {
    const tokenId = token.toLowerCase()
    const quoteId = quote.toLowerCase()
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${quoteId}`
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // return format {"ethereum":{"usd":2234.6}}
    const result = await data.json()
    return result[tokenId][quoteId]
}

export async function getTokenPrice(token: string, quote: string, adapter = adapterCoinGecko) {
  return await adapter(token, quote)
}
