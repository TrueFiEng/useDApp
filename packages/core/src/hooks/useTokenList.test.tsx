import { useTokenList } from '../../src'
import { expect } from 'chai'
import { renderDAppHook, setupTestingConfig } from '../../src/testing'
import fetchMock from 'fetch-mock'

describe('useTokenList', () => {
  it('returns token list', async () => {
    const { config, network1 } = await setupTestingConfig()

    const tokens = {
      name: 'Uniswap Labs List',
      logoURI: 'ipfs://QmNa8mQkrNKp1WEEeGjFezDmDeodkWRevGFN8JCV7b4Xir',
      tokens: [
        {
          chainId: network1.chainId,
          address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
          name: 'Aave',
          symbol: 'AAVE',
          decimals: 18,
          logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
        },
      ],
    }

    fetchMock.mock('http://example.com', tokens)

    const { result, waitForCurrent } = await renderDAppHook(() => useTokenList('http://example.com'), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.deep.eq(tokens)
  })
})
