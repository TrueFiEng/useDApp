import { expect } from 'chai'
import { Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { Mainnet } from '../model'
import { createMockProvider, CreateMockProviderResult, renderDAppHook } from '../testing'
import { useEtherBalance } from './useEtherBalance'
import { useEthers } from './useEthers'

describe('useEtherBalance', () => {
  let network1: CreateMockProviderResult
  let network2: CreateMockProviderResult
  let deployer: Wallet
  let config: Config
  const receiver = Wallet.createRandom()

  before(async () => {
    network1 = await createMockProvider({ chainId: Mainnet.chainId })
    network2 = await createMockProvider({ chainId: 1337 })
    ;[deployer] = network1.provider.getWallets()
    config = {
      readOnlyChainId: Mainnet.chainId,
      readOnlyUrls: {
        [Mainnet.chainId]: network1.provider,
        [1337]: network2.provider,
      },
      multicallAddresses: {
        ...network1.multicallAddresses,
        ...network2.multicallAddresses,
      },
    }

    await deployer.connect(network1.provider).sendTransaction({ to: receiver.address, value: 100 })
    await deployer.connect(network2.provider).sendTransaction({ to: receiver.address, value: 200 })
  })

  it('returns 0 for random wallet', async () => {
    const { address } = Wallet.createRandom()
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(address), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(0)
  })

  it('default readonly chain', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEtherBalance(receiver.address), { config })
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('defaults to active read-write provider chain id', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          activate(network2.provider)
        }, [])

        return useEtherBalance(receiver.address)
      },
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })

  it('explicitly mainnet', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useEtherBalance(receiver.address, { chainId: Mainnet.chainId }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(100)
  })

  it('explicitly specified chain id', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => useEtherBalance(receiver.address, { chainId: 1337 }),
      { config }
    )
    await waitForCurrent((val) => val !== undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(200)
  })
})
