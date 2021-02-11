import { expect } from 'chai'
import { useBlockMeta } from '../src'
import { renderWeb3Hook, sleep } from '../src/testing'

describe('useBlockMeta', () => {
  it('retrieves block timestamp and difficulty', async () => {
    const {result, waitForCurrent} = await renderWeb3Hook(useBlockMeta)
    await waitForCurrent(val => val?.timestamp !== undefined && val?.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const current = result.current as ReturnType<typeof useBlockMeta>
    expect(current.timestamp).to.be.a('date')
    expect(current.difficulty).to.not.be.undefined
  })

  it('updates the block timestamp when a transaction gets mined', async () => {
    const {result, mineBlock, waitForCurrent} = await renderWeb3Hook(useBlockMeta)
    await waitForCurrent(val => val?.timestamp !== undefined && val?.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const current = result.current as ReturnType<typeof useBlockMeta>
    const firstTimestamp = current.timestamp

    await sleep(1000)
    await mineBlock()
    await waitForCurrent(val => val?.timestamp?.getTime() !== firstTimestamp?.getTime())
    expect((result.current as any).timestamp).to.be.greaterThan(firstTimestamp)
  }).timeout(5000)
})
