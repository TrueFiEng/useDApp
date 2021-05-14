import { expect } from 'chai'
import { useBlockMeta, BlockNumberProvider, ChainStateProvider, MultiCall } from '../../src'
import { deployMulticall, MockConnector, renderWeb3Hook, renderWeb3HookOptions, sleep } from '@usedapp/testing'
import { MockProvider } from 'ethereum-waffle'
import React from 'react'

describe('useBlockMeta', () => {
  let webHookOptions: renderWeb3HookOptions<{ children: React.ReactNode }>

  beforeEach(async () => {
    const mockProvider = new MockProvider()
    const mockConnector = new MockConnector(mockProvider)
    const multicallAddresses = await deployMulticall(mockProvider, mockConnector, MultiCall)
    const wrapper: React.FC = ({ children }) => (
      <BlockNumberProvider>
        <ChainStateProvider multicallAddresses={multicallAddresses}>{children}</ChainStateProvider>
      </BlockNumberProvider>
    )
    webHookOptions = { mockProvider, mockConnector, renderHook: { wrapper } }
  })

  it('retrieves block timestamp and difficulty', async () => {
    const { result, waitForCurrent } = await renderWeb3Hook(useBlockMeta, webHookOptions)
    await waitForCurrent((val) => val?.timestamp !== undefined && val?.difficulty !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current.timestamp).to.be.a('date')
    expect(result.current.difficulty).to.not.be.undefined
  })

  it('updates the block timestamp when a transaction gets mined', async () => {
    const { result, mineBlock, waitForCurrent } = await renderWeb3Hook(useBlockMeta, webHookOptions)
    await waitForCurrent((val) => val.timestamp !== undefined && val.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const firstTimestamp = result.current.timestamp

    await sleep(1000)
    await mineBlock()
    await waitForCurrent((val) => val.timestamp?.getTime() !== firstTimestamp?.getTime())
    expect(result.current.timestamp).to.be.greaterThan(firstTimestamp)
  })
})
