import { useEffect, useState } from 'react'
import { getCoingeckoTokenPrices } from '../api/simpleTokenPrice'

export interface UseCoingeckoTokenPricesOptions {
  quote?: string
  platform?: string
  interval?: number
}

/**
 *
 * @param contracts List of contract addresses.
 * @param opts.quote Quote currency. "usd" by default.
 * @param opts.platform Platform. "ethereum" by default.
 * @param opts.interval Refresh interval in milliseconds. 1 minute by default.
 * @public
 */
export function useCoingeckoTokenPrices(contracts: string[], opts: UseCoingeckoTokenPricesOptions = {}) {
  const [prices, setPrices] = useState<number[] | undefined>(undefined)

  useEffect(() => {
    async function getPrice() {
      try {
        setPrices(await getCoingeckoTokenPrices(contracts, opts.quote ?? 'usd', opts.platform ?? 'ethereum'))
      } catch (err) {
        console.error(err)
      }
    }

    getPrice()

    const intervalId = setInterval(getPrice, opts.interval ?? 60_000)

    return () => clearInterval(intervalId)
  }, [contracts.join(','), opts.quote, opts.platform, opts.interval])

  return prices
}
