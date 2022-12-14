import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
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
  interface RequestParams {
    method: string
    params: any[]
  }

  before(async () => {
    address = Wallet.createRandom().address
    ;({ config } = await setupTestingConfig())
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

  it('signer undefined', async () => {
    const { result, waitForCurrent } = await renderDAppHook(useSigner, { config })
    await waitForCurrent((val) => val == undefined)
    expect(result.error).to.be.undefined
    expect(result.current).to.eq(undefined)
  })

  it('signer defined', async () => {
    const { result, waitForCurrent } = await renderDAppHook(
      () => {
        const { activateBrowserWallet, account, error } = useEthers()
        const signer = useSigner()

        useEffect(() => {
          setTimeout(() => activateBrowserWallet(), 100)
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
})
