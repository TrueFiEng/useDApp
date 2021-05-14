import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenAllowance, ERC20Mock, BlockNumberProvider, ChainStateProvider, MultiCall } from '../../src'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook, createChainStateProviderHookOptions, renderWeb3HookOptions } from '@usedapp/testing'
import { deployMockToken } from '@usedapp/testing'
import { utils } from 'ethers'
import React from 'react'

chai.use(solidity)

describe('useTokenAllowance', () => {
  const mockProvider = new MockProvider()
  const [deployer, spender] = mockProvider.getWallets()
  let token: Contract
  let webHookOptions: renderWeb3HookOptions<{ children: React.ReactNode }>

  beforeEach(async () => {
    token = await deployMockToken(deployer, ERC20Mock)
    webHookOptions = await createChainStateProviderHookOptions(
      BlockNumberProvider,
      ChainStateProvider,
      MultiCall,
      mockProvider
    )
  })

  it('returns 0 when spender is not yet approved', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      webHookOptions
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('returns current allowance', async () => {
    await token.approve(spender.address, utils.parseEther('1'))

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenAllowance(token.address, deployer.address, spender.address),
      webHookOptions
    )

    await waitForCurrent((val) => val !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current).to.eq(utils.parseEther('1'))
  })
})
