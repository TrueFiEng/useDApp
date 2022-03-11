import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useChainCall } from '..'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../testing'
import { encodeCallData } from '../helpers'
import { ChainId } from '../constants/chainId'

describe('useChainCall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it.only('initial test balance to be correct', async () => {
    const callData = {
        contract: token,
        method: 'balanceOf',
        args: [deployer.address],
    }
    const { result, waitForCurrent } = await renderWeb3Hook(() => useChainCall(encodeCallData(callData, ChainId.Localhost)), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })
})
