import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Cronos, CronosTestnet } from '../../../src'

describe('Cronos Chain', () => {
  it('getChainId', () => {
    expect(Cronos.chainId).to.equal(56)
    expect(CronosTestnet.chainId).to.equal(97)
  })

  it('getChainName', () => {
    expect(Cronos.chainName).to.eq('Cronos')
    expect(CronosTestnet.chainName).to.eq('CronosTestnet')
  })

  it('isTestChain', () => {
    expect(Cronos.isTestChain).to.be.false
    expect(CronosTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Cronos.isLocalChain).to.be.false
    expect(CronosTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Cronos.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://cronoscan.com/address/${TEST_ADDRESS}`)
    expect(CronosTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://cronos.crypto.org/explorer/testnet3/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Cronos.getExplorerTransactionLink(TEST_TX)).to.eq(`https://cronoscan.com/tx/${TEST_TX}`)
    expect(CronosTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://cronos.crypto.org/explorer/testnet3/tx/${TEST_TX}`)
  })
})
