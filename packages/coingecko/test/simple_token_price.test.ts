import { expect } from 'chai'

import { getCoingeckoSimpleTokenPriceUri, fetchCoingeckoTokenPrice } from '../src/simple_token_price'

const WETH_CONTRACT = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const WBTC_CONTRACT = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
const PLATFORM = 'ethereum'

describe('getCoingeckoSimpleTokenPriceUri', () => {
  it('WETH in usd price', () => {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${WETH_CONTRACT}&vs_currencies=usd`
    expect(getCoingeckoSimpleTokenPriceUri(WETH_CONTRACT, 'usd', PLATFORM)).to.eq(url)
  })

  it('DAI in usd price', () => {
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${WBTC_CONTRACT}&vs_currencies=usd`
    expect(getCoingeckoSimpleTokenPriceUri(WBTC_CONTRACT, 'usd', PLATFORM)).to.eq(url)
  })
})

describe('getCoingeckoTokenPriceFetch', () => {
  it('Success', async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => ({ [WETH_CONTRACT]: { usd: 2747.45 } }),
      })
    const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(mockFetch)
    expect(await getCoingeckoTokenPrice(WETH_CONTRACT, 'usd', PLATFORM)).to.eq('2747.45')
  })

  it('No Answer', async () => {
    const mockFetch = () => {
      throw new Error()
    }
    const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(mockFetch)
    expect(await getCoingeckoTokenPrice(WETH_CONTRACT, 'usd', PLATFORM)).to.eq(undefined)
  })

  it('Wrong Answer', async () => {
    const mockFetch = () =>
      Promise.resolve({
        json: () => ({ eth: { usd: 2234.6 } }),
      })
    const getCoingeckoTokenPrice = fetchCoingeckoTokenPrice(mockFetch)
    expect(await getCoingeckoTokenPrice(WETH_CONTRACT, 'usd', PLATFORM)).to.eq(undefined)
  })
})
