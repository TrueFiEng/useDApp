import { expect } from 'chai'
import { Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { Mainnet } from '../model'
import { TestingNetwork, renderDAppHook, setupTestingConfig, sleep } from '../testing'
import { useEtherBalance } from './useEtherBalance'
import { useEthers } from './useEthers'

describe('useEtherBalance', () => {
  let network1: TestingNetwork
  let network2: TestingNetwork
  let config: Config
  const receiver = Wallet.createRandom().address

  beforeEach(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await network2.wallets[1].sendTransaction({ to: receiver, value: 200 })
  })

  it('returns 0 for random wallet', async () => {
    const { address } = Wallet.createRandom()
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(address), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('default readonly chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('does not change static value when changing ether value', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver, { isStatic: true }), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('does change non-static value when changing ether value', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver, { isStatic: false }), {
      config,
    })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
    await sleep(1000)
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await sleep(1000)
    await waitForCurrent((val) => val?.toString() === '200')
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })

  it('defaults to active read-write provider chain id', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(network2.provider)
        }, [])

        return useEtherBalance(receiver)
      },
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })

  it('explicitly mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useEtherBalance(receiver, { chainId: Mainnet.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('explicitly specified chain id', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useEtherBalance(receiver, { chainId: network2.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })
})
