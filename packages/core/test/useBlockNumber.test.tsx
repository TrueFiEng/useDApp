import { expect } from 'chai'
import { useBlockNumber } from '../src'
import { renderWeb3Hook } from '../src/testing'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const {result, waitForCurrentEqual} = renderWeb3Hook(useBlockNumber)

    await waitForCurrentEqual(0)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(0) // block number 0
  })

  it('updates the block number when a transaction gets mined', async () => {
    const {result, waitForCurrentEqual, mineBlock} = renderWeb3Hook(useBlockNumber)
    await waitForCurrentEqual(0)
    
    await mineBlock()

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  }).timeout(5000)
})
