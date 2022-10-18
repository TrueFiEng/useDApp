import { expect } from 'chai'
import { useBlockNumber } from '../../src'
import { renderDAppHook, setupTestingConfig } from '../../src/testing'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const { config } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  })

  it('updates the block number when a transaction gets mined', async () => {
    const { config, network1 } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })
    const blockNumberFromProvider = await network1.provider.getBlockNumber()
    await waitForCurrentEqual(blockNumberFromProvider)

    await network1.mineBlock()

    await waitForCurrentEqual(blockNumberFromProvider + 1)
    expect(result.error).to.be.undefined
  })
})
