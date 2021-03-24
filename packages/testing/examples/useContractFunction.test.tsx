import { ERC20Interface, useContractFunction } from '@usedapp/core'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
import { renderWeb3Hook } from '../src'
import { deployMockToken } from '../src/utils/deployMockToken'

chai.use(solidity)

describe('useContractFunction', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('can approve erc20 token', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useContractFunction(ERC20Interface, token.address, 'approve'),
      {
        mockProvider,
      }
    )

    const { send } = result.current
    await send([spender.address, 200])
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)
  })
})
