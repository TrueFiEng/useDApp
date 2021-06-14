import { useEffect, useState } from 'react'
import { useBlockNumber } from '@usedapp/core'

import { getCoingeckoPrice } from './simple_price'
import { getCoingeckoTokenPrice } from './simple_token_price'

export const useCoingeckoPrice = (base: string, quote = 'usd'): string | undefined => {
  const [price, setPrice] = useState<string | undefined>(undefined)
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

export const useCoingeckoTokenPrice = (contract: string, quote = 'usd', platform = 'ethereum'): string | undefined => {
  const [price, setPrice] = useState<string | undefined>(undefined)
  const blockNo = useBlockNumber()

  useEffect(() => {
    async function getPrice() {
      const tokenPrice = await getCoingeckoTokenPrice(contract, quote, platform)
      setPrice(tokenPrice)
    }

    getPrice()
  }, [contract, quote, platform, blockNo])

  return price
}
