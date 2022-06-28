import { ethers, Wallet } from 'ethers'
import { setupTestingConfig, TestingNetwork } from '../testing'
import { getSignerFromOptions } from './getSignerFromOptions'
import { expect } from 'chai'

describe('getSignerFromOptions', () => {
  let network1: TestingNetwork
  let wallet1: Wallet

  beforeEach(async () => {
    ;({ network1 } = await setupTestingConfig())
    wallet1 = ethers.Wallet.fromMnemonic('radar blur cabbage chef fix engine embark joy scheme fiction master release')
  })

  it('returns signer for private key', () => {
    const signer = getSignerFromOptions(network1.provider, {
      privateKey: wallet1.privateKey,
      chainId: 1,
    })

    expect(signer).not.to.be.undefined
  })

  it('returns signer for mnemonicPhrase', () => {
    const signer = getSignerFromOptions(network1.provider, {
      mnemonicPhrase: wallet1.mnemonic.phrase,
      chainId: 1,
    })

    expect(signer).not.to.be.undefined
  })

  it('returns signer for encrypted json', async () => {
    const json = await wallet1.encrypt('test')

    const signer = getSignerFromOptions(network1.provider, {
      json,
      password: 'test',
      chainId: 1,
    })

    expect(signer).not.to.be.undefined
  })

  it('returns signer for signer', () => {
    const signer = getSignerFromOptions(network1.provider, {
      signer: wallet1,
    })

    expect(signer).not.to.be.undefined
  })

  it('returns signer for library', () => {
    const signer = getSignerFromOptions(network1.provider, undefined, network1.provider)

    expect(signer).not.to.be.undefined
  })

  it('returns undefined for almost empty key arguments', () => {
    const signer = getSignerFromOptions(network1.provider)

    expect(signer).to.be.undefined
  })
})
