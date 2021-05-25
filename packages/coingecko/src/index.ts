import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { getCoingeckoPrice } from './helpers'

export const useCoingeckoPrice = (base: string, quote = 'usd'): number => {
  const [price, setPrice] = useState(0)
  const blockNo = useBlockNumber()

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoPrice(base, quote)
      setPrice(tokenPrice)
    }

    if (base && quote && blockNo) {
      getPrice()
    }
  }, [base, quote, blockNo])

  return price
}
