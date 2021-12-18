import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Fantom, FantomTestnet } from '../../../src'

describe('Fantom Chain', () => {
  it('getChainId', () => {
    expect(Fantom.chainId).to.equal(250)
    expect(FantomTestnet.chainId).to.equal(4002)
  })

  it('getChainName', () => {
    expect(Fantom.chainName).to.eq('Fantom')
    expect(FantomTestnet.chainName).to.eq('FantomTestnet')
  })

  it('isTestChain', () => {
    expect(Fantom.isTestChain).to.be.false
    expect(FantomTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Fantom.isLocalChain).to.be.false
    expect(FantomTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Fantom.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://ftmscan.com/address/${TEST_ADDRESS}`)
    expect(FantomTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://testnet.ftmscan.com/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Fantom.getExplorerTransactionLink(TEST_TX)).to.eq(`https://ftmscan.com/tx/${TEST_TX}`)
    expect(FantomTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.ftmscan.com/tx/${TEST_TX}`)
  })
})
