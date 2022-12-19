import { FallbackProvider } from '@ethersproject/providers'
import { expect } from 'chai'
import { BigNumber, Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { renderDAppHook, setupTestingConfig, sleep, TestingNetwork } from '../testing'
import { useEthers } from './useEthers'
import { useSigner } from './useSigner'

describe('useSigner', () => {
  let address: string
  let config: Config
  let network1: TestingNetwork
  interface RequestParams {
    method: string
    params: any[]
  }

  before(async () => {
    ;({ config, network1 } = await setupTestingConfig())
    address = Wallet.createRandom().address
    window.ethereum = {
      request: async ({ method }: RequestParams) => {
        await sleep(100)
        if (method === 'eth_requestAccounts' || method === 'eth_accounts') return [address]
        else if (method === 'eth_chainId') return BigNumber.from(31337).toHexString()
        else if (method === 'eth_blockNumber') return BigNumber.from(1).toHexString()
      },
    } as any
  })

  after(() => {
    delete window.ethereum
  })

  it('signer defined', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activateBrowserWallet, account, error } = useEthers()
        const signer = useSigner()

        useEffect(() => {
          const t = setTimeout(() => {
            activateBrowserWallet()
          }, 100)
          return () => {
            clearTimeout(t)
          }
        }, [])

        return { signer, error, account }
      },
      { config }
    )

    await waitForCurrent((val) => val.account !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current.signer).to.not.be.undefined
    expect(await result.current.signer?.getAddress()).to.equal(address)
  })

  it('signer undefined', async () => {
    ;({ config, network1 } = await setupTestingConfig())
    config.readOnlyUrls ? (config.readOnlyUrls[1] = new FallbackProvider([network1.provider])) : null
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const signer = useSigner()
        const { isLoading } = useEthers()
        return { signer, isLoading }
      },
      { config }
    )
    await waitForCurrent((val) => val.isLoading == false)
    expect(result.error).to.be.undefined
    expect(result.current.signer).to.eq(undefined)
  })
})
