import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useToken } from '..'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../testing'

describe('useToken', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract
  const mockTokenData = {
    name: 'MOCKToken',
    symbol: 'MOCK',
    decimals: 18,
    totalSupply: MOCK_TOKEN_INITIAL_BALANCE,
  }

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('returns correct token constants', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useToken(token.address), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.deep.equal(mockTokenData)
  })
})
