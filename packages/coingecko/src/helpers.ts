export const getCoinGeckoSimplePriceUri = (baseId: string, quoteId: string) => {
  return `https://api.coingecko.com/api/v3/simple/price?ids=${baseId}&vs_currencies=${quoteId}`
}

export async function getCoingeckoPrice(base: string, quote: string) {
  const baseId = base.toLowerCase()
  const quoteId = quote.toLowerCase()
  const url = getCoinGeckoSimplePriceUri(baseId, quoteId)
  try {
    const data = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // return format {"ethereum":{"usd":2234.6}}
    const result = await data.json()
    return result[baseId][quoteId]
  } catch (err) {
    return err
  }
}
