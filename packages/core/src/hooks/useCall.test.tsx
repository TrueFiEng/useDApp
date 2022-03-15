import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useCall } from '../../src'
import { expect } from 'chai'
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../../src/testing'

describe('useCall', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('initial test balance to be correct', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () =>
        useCall({
          contract: token,
          method: 'balanceOf',
          args: [deployer.address],
        }),
      {
        mockProvider,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current?.value[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })
})
