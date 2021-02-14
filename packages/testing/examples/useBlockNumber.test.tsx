import { expect } from 'chai'
import { useBlockNumber } from '@usedapp/core'
import { renderWeb3Hook } from '../src'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const { result, waitForCurrentEqual } = await renderWeb3Hook(useBlockNumber)

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  })

  it('updates the block number when a transaction gets mined', async () => {
    const { result, waitForCurrentEqual, mineBlock } = await renderWeb3Hook(useBlockNumber)
    await waitForCurrentEqual(1)

    await mineBlock()

    await waitForCurrentEqual(2)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(2)
  })
})
