import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenBalance, ERC20Mock, MultiCall, BlockNumberProvider, ChainStateProvider } from '@usedapp/core'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook, renderWeb3HookOptions, MockConnector, deployMulticall } from '../src'
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE } from '../src/utils/deployMockToken'
import React from 'react'

chai.use(solidity)

describe('useTokenBalance', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let token: Contract
  let webHookOptions: renderWeb3HookOptions<{ children: React.ReactNode }>

  beforeEach(async () => {
    token = await deployMockToken(deployer, ERC20Mock)
    const mockConnector = new MockConnector(mockProvider)
    const multicallAddresses = await deployMulticall(mockProvider, mockConnector, MultiCall)
    const wrapper: React.FC = ({ children }) => (
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    )
    webHookOptions = { mockProvider, mockConnector, renderHook: { wrapper } }
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
