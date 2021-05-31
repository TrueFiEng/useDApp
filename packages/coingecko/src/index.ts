import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { getCoingeckoPrice } from './helpers'

export const useCoingeckoPrice = (base: string, quote = 'usd'): number | undefined => {
  const [price, setPrice] = useState(undefined)
  const blockNo = useBlockNumber()

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoPrice(base, quote)
      setPrice(tokenPrice)
    }

    getPrice()
  }, [base, quote, blockNo])

  return price
}
