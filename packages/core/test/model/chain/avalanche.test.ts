import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Avalanche, AvalancheTestnet } from '../../../src'

describe('Avalanche Chain', () => {
  it('getChainId', () => {
    expect(Avalanche.chainId).to.equal(43114)
    expect(AvalancheTestnet.chainId).to.equal(43113)
  })

  it('getChainName', () => {
    expect(Avalanche.chainName).to.eq('Avalanche')
    expect(AvalancheTestnet.chainName).to.eq('AvalancheTestnet')
  })

  it('isTestChain', () => {
    expect(Avalanche.isTestChain).to.be.false
    expect(AvalancheTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Avalanche.isLocalChain).to.be.false
    expect(AvalancheTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Avalanche.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://snowtrace.io/address/${TEST_ADDRESS}`)
    expect(AvalancheTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://testnet.snowtrace.io/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Avalanche.getExplorerTransactionLink(TEST_TX)).to.eq(`https://snowtrace.io/tx/${TEST_TX}`)
    expect(AvalancheTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.snowtrace.io/tx/${TEST_TX}`)
  })
})
