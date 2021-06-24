import { expect } from 'chai'

import { getCoingeckoSimplePriceUri, fetchCoingeckoPrice } from '../src/simple_price'

describe('getCoingeckoSimplePrice', () => {
  it('ethereum in usd price', () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    expect(getCoingeckoSimplePriceUri('ethereum', 'usd')).to.eq(url)
  })

  it('bitcoin in usd price', () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    expect(getCoingeckoSimplePriceUri('bitcoin', 'usd')).to.eq(url)
  })

  it('dai in usd price', () => {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd'
    expect(getCoingeckoSimplePriceUri('dai', 'usd')).to.eq(url)
  })
})

describe('getCoingeckoPriceFetch', () => {
  it('Success', async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => ({ ethereum: { usd: 2234.6 } }),
      })
    const getCoingeckoPrice = fetchCoingeckoPrice(mockFetch)
    expect(await getCoingeckoPrice('ethereum', 'usd')).to.eq('2234.6')
  })

  it('No Answer', async () => {
    const mockFetch = () => {
      throw new Error()
    }
    const getCoingeckoPrice = fetchCoingeckoPrice(mockFetch)
    expect(await getCoingeckoPrice('ethereum', 'usd')).to.eq(undefined)
  })

  it('Wrong Answer', async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => ({ eth: { usd: 2234.6 } }),
      })
    const getCoingeckoPrice = fetchCoingeckoPrice(mockFetch)
    expect(await getCoingeckoPrice('ethereum', 'usd')).to.eq(undefined)
  })
})
