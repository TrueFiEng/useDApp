export async function getCoingeckoPrice(token: string, quote: string) {
  const tokenId = token.toLowerCase()
  const quoteId = quote.toLowerCase()
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${quoteId}`
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // return format {"ethereum":{"usd":2234.6}}
    const result = await data.json()
    return result[tokenId][quoteId]
  } catch (err) {
    return err
  }
}
