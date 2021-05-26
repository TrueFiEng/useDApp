import { expect } from 'chai'
import { getCoinGeckoSimplePriceUri } from '../src/helpers'
const testData = [
  ['ethereum', 'usd', 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'],
  ['bitcoin', 'usd', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'],
  ['dai', 'usd', 'https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd'],
]

describe('Coingecko helper', () => {
  it('correct simple price URI', () => {
    testData.forEach(data => expect(getCoinGeckoSimplePriceUri(data[0], data[1])).to.eq(data[2]))
  })
})
