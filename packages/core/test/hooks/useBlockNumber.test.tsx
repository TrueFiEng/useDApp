import { expect } from 'chai'
import { useBlockNumber, BlockNumberProvider, ChainStateProvider, MultiCall } from '../../src'
import { renderWeb3Hook, renderWeb3HookOptions, createChainStateProviderHookOptions } from '@usedapp/testing'
import React from 'react'

describe('useBlockNumber', () => {
  let webHookOptions: renderWeb3HookOptions<{ children: React.ReactNode }>

  beforeEach(async () => {
    webHookOptions = await createChainStateProviderHookOptions(BlockNumberProvider, ChainStateProvider, MultiCall)
  })

  it('retrieves block number', async () => {
    const { result, waitForCurrentEqual } = await renderWeb3Hook(useBlockNumber, webHookOptions)

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  })

  it('updates the block number when a transaction gets mined', async () => {
    const { result, waitForCurrentEqual, mineBlock } = await renderWeb3Hook(useBlockNumber, webHookOptions)
    await waitForCurrentEqual(1)

    await mineBlock()

    await waitForCurrentEqual(2)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(2)
  })
})
