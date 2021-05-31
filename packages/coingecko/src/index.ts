import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'
import { getCoingeckoPrice } from './helpers'

export const useCoingeckoPrice = (base: string, quote = 'usd'): number | undefined => {
  const [price, setPrice] = useState(undefined)
  const blockNo = useBlockNumber()

  useEffect(() => {
    async function getPrice() {
      try {
        const tokenPrice = await getCoingeckoPrice(base, quote)
        setPrice(tokenPrice)
      } catch (_) {
        setPrice(undefined)
      }
    }

    getPrice()
  }, [base, quote, blockNo])

  return price
}
