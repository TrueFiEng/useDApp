import { expect } from 'chai'
import { providers, Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { Localhost, Mainnet, Mumbai } from '../model'
import { createMockProvider, renderDAppHook, setupTestingConfig, TestingNetwork } from '../testing'
import { useEthers } from './useEthers'

import Ganache, { Server } from 'ganache'
import { InjectedConnector } from '../providers/network/connectors/implementations'

describe.only('useEthers', () => {
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
    expect(result.current.error).to.be.undefined
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

  it('throws error if trying to use unsupported network', async () => {
    const configWithUnsupportedNetworks: Config = {
      ...config,
      networks: [Mainnet],
    }
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(new InjectedConnector(network2.provider))
        }, [])

        return useEthers()
      },
      { config: configWithUnsupportedNetworks }
    )

    await waitForCurrent((val) => !!val.error)
    expect(result.current.error).not.to.be.undefined
    expect(result.current.error?.toString()).to.include(`Unsupported chain id: ${network2.chainId}`)
  })

  it('throws error if trying to use not configured network', async () => {
    const notConfiguerdNetwork = await createMockProvider({ chainId: Localhost.chainId })
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(new InjectedConnector(notConfiguerdNetwork.provider))
        }, [])

        return useEthers()
      },
      { config }
    )

    await waitForCurrent((val) => !!val.error)
    expect(result.current.error).not.to.be.undefined
    expect(result.current.error?.toString()).to.include(`Not configured chain id: ${Localhost.chainId}`)
  })

  it('returns correct provider after activation', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activate } = useEthers()
        useEffect(() => {
          void activate(new InjectedConnector(network2.provider))
        }, [])

        return useEthers()
      },
      { config }
    )
    await waitForCurrent((val) => !val.isLoading && val.chainId === network2.provider.network.chainId)

    expect(result.error).to.be.undefined
    expect(result.current.error).to.be.undefined
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

  describe.only('Websocket provider', () => {
    let ganacheServer: Server<'ethereum'>
    const wsPort = 18845
    const wsUrl = `ws://localhost:${wsPort}`

    before(async () => {
      ganacheServer = Ganache.server({ server: { ws: true }, logging: { quiet: true } })
      await ganacheServer.listen(wsPort)
    })

    after(async () => {
      await ganacheServer.close()
    })

    it('works with a websocket provider', async () => {
      const { result, waitForCurrent } = await renderDAppHook(() => useEthers(), {
        config: {
          readOnlyChainId: Mumbai.chainId,
          readOnlyUrls: {
            [Mumbai.chainId]: new providers.WebSocketProvider(wsUrl),
          },
        },
      })
      await waitForCurrent((val) => !val.isLoading)
      expect(result.error).to.be.undefined
    })
  })
})
