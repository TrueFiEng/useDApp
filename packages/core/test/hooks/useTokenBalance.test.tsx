import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenBalance, ERC20Mock, MultiCall, BlockNumberProvider, ChainStateProvider } from '../../src'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook, renderWeb3HookOptions, createChainStateProviderHookOptions } from '@usedapp/testing'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '@usedapp/testing'
import React from 'react'

chai.use(solidity)

describe('useTokenBalance', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
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

  it('returns balance', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useTokenBalance(token.address, deployer.address),
      webHookOptions
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE)
  })
})
