import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenAllowance } from '@usedapp/core'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook } from '../src'
import { deployMockToken } from '../src/utils/deployMockToken'
import { utils } from 'ethers'

chai.use(solidity)

describe('useTokenAllowance', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract

  beforeEach(async () => {
    token = await deployMockToken(deployer)
  })

  it('returns 0 when spender is not yet approved', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        mockProvider,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('returns current allowance', async () => {
    await token.approve(spender.address, utils.parseEther('1'))

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      {
        mockProvider,
      }
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(utils.parseEther('1'))
  })
})
