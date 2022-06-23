import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from 'ethers'
import { useToken } from '..'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../testing'

describe('useToken', async () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract
  let chainId: number

  beforeEach(async () => {
    chainId = (await mockProvider.getNetwork()).chainId
    token = await deployMockToken(deployer)
  })

  it('returns correct token constants', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useToken(token.address), {
      readonlyMockProviders: {
        [chainId]: mockProvider,
      },
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.deep.equal({
      name: 'MOCKToken',
      symbol: 'MOCK',
      decimals: 18,
      totalSupply: MOCK_TOKEN_INITIAL_BALANCE,
    })
  })

  it('should not throw error when token address is Falsy', async () => {
    const { result } = await renderWeb3Hook(() => useToken(null), {
      mockProvider,
    })
    expect(result.error).to.be.undefined
    expect(result.current).to.be.undefined
  })
})
