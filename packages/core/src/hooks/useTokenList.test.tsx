import { ChainId, useTokenList } from '../../src'
import { expect } from 'chai'
import { renderWeb3Hook } from '../../src/testing'
import fetchMock from 'fetch-mock'

describe('useTokenList', () => {
  const tokens = {
    name: 'Uniswap Labs List',
    logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
    tokens: [
      {
        chainId: ChainId.Localhost,
        address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
        name: 'Aave',
        symbol: 'AAVE',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
      },
    ],
  }

  it('returns token list', async () => {
    fetchMock.mock('http://example.com', tokens)
    
    const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenList('http://example.com'), {})
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.deep.eq(tokens)
  })
})
