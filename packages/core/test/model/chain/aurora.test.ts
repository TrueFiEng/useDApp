import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Aurora, AuroraTestnet } from '../../../src'

describe.only('Aurora Tesnet Chain', () => {
  it('getChainId', () => {
    expect(Aurora.chainId).to.equal(1313161554)
    expect(AuroraTestnet.chainId).to.equal(1313161555)
  })

  it('getChainName', () => {
    expect(Aurora.chainName).to.eq('Aurora')
    expect(AuroraTestnet.chainName).to.eq('Aurora Testnet')
  })

  it('isTestChain', () => {
    expect(Aurora.isTestChain).to.be.false
    expect(AuroraTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Aurora.isLocalChain).to.be.false
    expect(AuroraTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Aurora.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.mainnet.aurora.dev/address/${TEST_ADDRESS}`)
    expect(AuroraTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.testnet.aurora.dev/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Aurora.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.mainnet.aurora.dev/tx/${TEST_TX}`)
    expect(AuroraTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.testnet.aurora.dev/tx/${TEST_TX}`)
  })
})
