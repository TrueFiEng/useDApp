import { expect } from 'chai'
import { useBlockMeta, BlockNumberProvider, ChainStateProvider, MultiCall } from '../../src'
import { renderWeb3Hook, renderWeb3HookOptions, sleep, createChainStateProviderHookOptions } from '@usedapp/testing'
import React from 'react'

describe('useBlockMeta', () => {
  let webHookOptions: renderWeb3HookOptions<{ children: React.ReactNode }>

  beforeEach(async () => {
    webHookOptions = await createChainStateProviderHookOptions(BlockNumberProvider, ChainStateProvider, MultiCall)
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
