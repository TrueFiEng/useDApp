import { useState, useEffect } from 'react'

import { getTokenPrice, adapterCoinGecko } from '../helpers/price'

export const useTokenPrice = (token: string, quote: string, adapter = adapterCoinGecko) => {
  const [price, setPrice] = useState(null)
  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getTokenPrice(token, quote, adapter)
      setPrice(tokenPrice)
    }

    if (token && quote) {
      getPrice()
    }
  }, [token, quote])

  return price
}
