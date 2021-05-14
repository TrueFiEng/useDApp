import { ERC20Mock, MultiCall, useContractFunction, BlockNumberProvider, ChainStateProvider } from '../../src'
import chai, { expect } from 'chai'
import { MockProvider, solidity } from 'ethereum-waffle'
import { Contract } from 'ethers'
import React from 'react'
import { deployMulticall, MockConnector, renderWeb3Hook, renderWeb3HookOptions } from '@usedapp/testing'
import { contractCallOutOfGasMock } from '@usedapp/testing'
import { deployMockToken } from '@usedapp/testing'

chai.use(solidity)

describe('useContractFunction', () => {
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

  it('success', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), webHookOptions)

    await result.current.send(spender.address, 200)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Success')
    expect(await token.allowance(deployer.address, spender.address)).to.eq(200)
  })

  it('exception (bad arguments)', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(() => useContractFunction(token, 'approve'), webHookOptions)

    await result.current.send()
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Exception')
    if (result.current.state.status === 'Exception') {
      expect(result.current.state.errorMessage).to.eq('missing argument: passed to contract')
    }
  })

  it('fail (when transaction reverts)', async () => {
    const contractMock = contractCallOutOfGasMock

    const { result, waitForCurrent } = await renderWeb3Hook(
      () => useContractFunction(contractMock, 'transfer'),
      webHookOptions
    )

    await result.current.send(spender.address, 10)
    await waitForCurrent((val) => val.state !== undefined)

    expect(result.current.state.status).to.eq('Fail')
    if (result.current.state.status === 'Fail') {
      expect(result.current.state.errorMessage).to.eq('out of gas')
    }
  })
})
