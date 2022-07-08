import { expect } from 'chai'
import { Wallet } from 'ethers'
import { Config } from '../constants'
import { TestingNetwork, renderDAppHook, setupTestingConfig } from '../testing'
import { useEtherBalance } from './useEtherBalance'
import { sleep } from '../testing/utils/waitUntil'

describe('useEtherBalance with refreshing', () => {
  let network1: TestingNetwork
  let config: Config
  const receiver = Wallet.createRandom().address

  const mineBlock = async () => {
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await sleep(1000) // block needs time to be mined
  }

  beforeEach(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
  })

  it('does not change value with never refreshing with global config', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver), {
      config: {
        ...config,
        refresh: 'never',
      },
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('does not change value with never refreshing with query param', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useEtherBalance(receiver, {
          refresh: 'never',
        }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('does change value every block', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver), {
      config: {
        ...config,
        refresh: 'everyBlock',
      },
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val?.toString() === '200')
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })

  it('overrides global config with query param', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useEtherBalance(receiver, {
          refresh: 'everyBlock',
        }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val?.toString() === '200')
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })

  it('does change value after specified number of blocks with global config', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver), {
      config: {
        ...config,
        refresh: 2,
      },
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val?.toString() === '300')
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(300)
  })

  it('does change value after specified number of blocks with query param', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () =>
        useEtherBalance(receiver, {
          refresh: 2,
        }),
      {
        config,
      }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await mineBlock()
    await waitForCurrent((val) => val?.toString() === '300')
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(300)
  })
})
