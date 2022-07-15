import { expect } from 'chai'
import { Wallet } from 'ethers'
import { Config, useBlockMeta } from '..'
import { renderDAppHook, renderWeb3Hook, sleep, setupTestingConfig, TestingNetwork } from '../testing'

describe.only('useBlockMeta', () => {
  let network1: TestingNetwork
  let config: Config
  const receiver = Wallet.createRandom().address

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
  })
  it('retrieves block timestamp and difficulty', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useBlockMeta, { config })
    await waitForCurrent((val) => val?.timestamp !== undefined && val?.difficulty !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current.timestamp).to.be.a('date')
    expect(result.current.difficulty).to.not.be.undefined
  })

  it('updates the block timestamp when a transaction gets mined', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useBlockMeta, { config })
    await waitForCurrent((val) => val.timestamp !== undefined && val.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const firstTimestamp = result.current.timestamp

    await sleep(1000)
    await network1.mineBlock()
    await waitForCurrent((val) => val.timestamp?.getTime() !== firstTimestamp?.getTime())
    expect(result.current.timestamp).to.be.greaterThan(firstTimestamp)
  })

  it('updates the block timestamp when a transaction gets mined qith dappHook', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useBlockMeta, { config })
    await waitForCurrent((val) => val.timestamp !== undefined && val.difficulty !== undefined)

    expect(result.error).to.be.undefined
    const firstTimestamp = result.current.timestamp

    await sleep(1000)
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await sleep(1000)
    await waitForCurrent((val) => val.timestamp?.getTime() !== firstTimestamp?.getTime())
    expect(result.current.timestamp).to.be.greaterThan(firstTimestamp)
  })
})
