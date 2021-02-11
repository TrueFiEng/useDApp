import { expect } from 'chai'
import { useBlockMeta } from '../src'
import { renderWeb3Hook, sleep } from '../src/testing'

describe('useBlockMeta', () => {
  it('retrieves block timestamp and difficulty', async () => {
    const {result, waitForCurrent} = await renderWeb3Hook(useBlockMeta)
    await waitForCurrent(val => val?.timestamp !== undefined && val?.difficulty !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current.timestamp).to.be.a('date')
    expect(result.current.difficulty).to.not.be.undefined
  })

  it('updates the block timestamp when a transaction gets mined', async () => {
    const {result, mineBlock, waitForCurrent} = await renderWeb3Hook(useBlockMeta)
    await waitForCurrent(val => val.timestamp !== undefined && val.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const firstTimestamp = result.current.timestamp

    await sleep(1000)
    await mineBlock()
    await waitForCurrent(val => val.timestamp?.getTime() !== firstTimestamp?.getTime())
    expect(result.current.timestamp).to.be.greaterThan(firstTimestamp)
  })
})
