import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { RawCall, useTokenBalance } from '../../src'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../../src/testing'
import { useRawCall } from '../../src/hooks/useRawCalls'

describe('useRawCall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it.only('can query ERC20 balance', async () => {
    const call: RawCall = {
      address: token.address,
      data: token.interface.encodeFunctionData('balanceOf', [deployer.address]),
      chainId: mockProvider.network.chainId,
    }
    const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(call), {
      mockProvider,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current!.success).to.eq(true)
    expect(result.current!.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })
})
