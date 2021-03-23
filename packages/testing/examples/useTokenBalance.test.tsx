import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenBalance } from '@usedapp/core'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook } from '../src'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'

chai.use(solidity)

describe('useTokenBalance', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('returns balance', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useTokenBalance(token.address, deployer.address), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })
})
