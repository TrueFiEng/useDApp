import { MockProvider } from '@ethereum-waffle/provider'
import { Contract } from '@ethersproject/contracts'
import { useTokenAllowance, ERC20Mock, BlockNumberProvider, ChainStateProvider, MultiCall } from '@usedapp/core'
import chai, { expect } from 'chai'
import { solidity } from 'ethereum-waffle'
import { renderWeb3Hook, MockConnector, deployMulticall, renderWeb3HookOptions } from '../src'
import { deployMockToken } from '../src/utils/deployMockToken'
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
    const mockConnector = new MockConnector(mockProvider)
    const multicallAddresses = await deployMulticall(mockProvider, mockConnector, MultiCall)
    const wrapper: React.FC = ({ children }) => (
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    )
    webHookOptions = { mockProvider, mockConnector, renderHook: { wrapper } }
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
