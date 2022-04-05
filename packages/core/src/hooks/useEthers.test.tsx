import { Provider } from '@ethersproject/abstract-provider'
import { expect } from 'chai'
import { MockProvider } from 'ethereum-waffle'
import { Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { Mainnet } from '../model'
import { TestingNetwork, renderDAppHook, setupTestingConfig, SECOND_TEST_CHAIN_ID } from '../testing'
import { useEtherBalance } from './useEtherBalance'
import { useEthers } from './useEthers'

describe('useEthers', () => {
  let network1: TestingNetwork
  let network2: TestingNetwork
  let config: Config
  const receiver = Wallet.createRandom().address

  before(async () => {
    ;({ config, network1, network2 } = await setupTestingConfig())
    await network1.wallets[0].sendTransaction({ to: receiver, value: 100 })
    await network2.wallets[1].sendTransaction({ to: receiver, value: 200 })
  })

  it('returns no wallets and readonly provider when not connected', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => useEthers(), { config })
    await waitForCurrent((val) => !val.isLoading)

    expect(result.error).to.be.undefined
    expect(result.current.activate).to.be.a('function')
    expect(result.current.deactivate).to.be.a('function')
    expect(result.current.activateBrowserWallet).to.be.a('function')
    expect(result.current.connector).to.be.undefined
    expect(result.current.chainId).to.eq(Mainnet.chainId)
    expect(result.current.account).to.be.undefined
    expect(result.current.error).to.be.undefined
    expect(result.current.library).to.eq(network1.provider)
    expect(result.current.active).to.be.true
    expect(result.current.isLoading).to.be.false
  })

  it('returns correct provider after activation', async () => {
    const { result, waitForCurrent } = await renderDAppHook(() => {
      const { activate } = useEthers()
      useEffect(() => {
        activate(network2.provider)
      }, [])

      return useEthers()
    }, { config })
    await waitForCurrent((val) => !val.isLoading && val.chainId === network2.provider.network.chainId)

    expect(result.error).to.be.undefined
    expect(result.current.activate).to.be.a('function')
    expect(result.current.deactivate).to.be.a('function')
    expect(result.current.activateBrowserWallet).to.be.a('function')
    expect(result.current.connector).to.be.undefined
    expect(result.current.chainId).to.eq(network2.provider.network.chainId)
    expect(result.current.account).to.eq(network2.provider.getWallets()[0].address)
    expect(result.current.error).to.be.undefined
    expect(result.current.library).to.eq(network2.provider)
    expect(result.current.active).to.be.true
    expect(result.current.isLoading).to.be.false
  })
})