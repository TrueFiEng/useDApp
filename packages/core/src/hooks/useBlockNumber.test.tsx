import { expect } from 'chai'
import { useBlockNumber, useBlockMeta } from '../../src'
import { renderDAppHook, setupTestingConfig, sleep } from '../../src/testing'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const { config } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  })

  it("doesn't update the block number when a transaction gets mined", async () => {
    const { config, network1 } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })
    const blockNumberFromProvider = await network1.provider.getBlockNumber()
    await waitForCurrentEqual(blockNumberFromProvider)

    await network1.mineBlock()

    await sleep(1000)
    expect(result.error).to.be.undefined
    // does not refresh because of optimisation - provider polls for the block number only if we have some non-static calls
    expect(result.current).to.be.equal(blockNumberFromProvider)
  })

  it('updates the block number when a transaction gets mined', async () => {
    const { config, network1 } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(
      () => {
        // eslint-disable-next-line no-empty-pattern
        const {} = useBlockMeta()
        const blockNumber = useBlockNumber()
        return blockNumber
      },
      { config }
    )
    const blockNumberFromProvider = await network1.provider.getBlockNumber()
    await waitForCurrentEqual(blockNumberFromProvider)

    await network1.mineBlock()

    // does update because we have a non-static call - useBlockMeta
    await waitForCurrentEqual(blockNumberFromProvider + 1)
    expect(result.error).to.be.undefined
  })
})
