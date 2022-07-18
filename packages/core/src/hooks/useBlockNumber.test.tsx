import { expect } from 'chai'
import { useBlockNumber } from '../../src'
import { renderDAppHook, setupTestingConfig, sleep } from '../../src/testing'

describe('useBlockNumber', () => {
  it('retrieves block number', async () => {
    const { config } = await setupTestingConfig()
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })

    await waitForCurrentEqual(1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(1)
  })

  it.skip('updates the block number when a transaction gets mined', async () => {
    const { config, network1 } = await setupTestingConfig()
    network1.provider.on('block', (payload: any) => { console.log({ payload }) })
    const { result, waitForCurrentEqual } = await renderDAppHook(useBlockNumber, { config })
    const blockNumber = await network1.provider.getBlockNumber()
    console.log({ blockNumber })
    console.log({ polling: network1.provider.polling, pollingInterval: network1.provider.pollingInterval })
    await waitForCurrentEqual(blockNumber)

    await network1.mineBlock()
    console.log({ blockNumber: await network1.provider.getBlockNumber() })

    await waitForCurrentEqual(blockNumber + 1)
    expect(result.error).to.be.undefined
    expect(result.current).to.be.equal(2)
  }).timeout(60000)
})
