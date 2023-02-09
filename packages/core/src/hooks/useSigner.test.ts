import { expect } from 'chai'
import { BigNumber, Wallet } from 'ethers'
import { useEffect } from 'react'
import { Config } from '../constants'
import { renderDAppHook, setupTestingConfig, sleep } from '../testing'
import { useEthers } from './useEthers'
import { useSigner } from './useSigner'

describe('useSigner', () => {
  let address: string
  let config: Config
  interface RequestParams {
    method: string
    params: any[]
  }

  before(async () => {
    address = Wallet.createRandom().address
    ;(window as any).ethereum = {
      request: async ({ method }: RequestParams) => {
        await sleep(100)
        if (method === 'eth_requestAccounts' || method === 'eth_accounts') return [address]
        else if (method === 'eth_chainId') return BigNumber.from(31337).toHexString()
        else if (method === 'eth_blockNumber') return BigNumber.from(1).toHexString()
      },
    } as any
  })

  after(() => {
    delete (window as any).ethereum
  })

  beforeEach(async () => {
    ;({ config } = await setupTestingConfig())
  })

  afterEach(() => {
    window.localStorage.clear()
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

    await waitForCurrent((val) => val.account !== undefined && val.signer !== undefined)

    expect(result.error).to.be.undefined
    expect(result.current.signer).to.not.be.undefined
    expect(await result.current.signer?.getAddress()).to.equal(address)
  })

  it('signer undefined', async () => {
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
