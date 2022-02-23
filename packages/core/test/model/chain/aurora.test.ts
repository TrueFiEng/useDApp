import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { AuroraTestnet } from '../../../src'

describe('Aurora Tesnet Chain', () => {
  it('getChainId', () => {
    expect(AuroraTestnet.chainId).to.equal(1313161554)
  })

  it('getChainName', () => {
    expect(AuroraTestnet.chainName).to.eq('Aurora Testnet')
  })

  it('isTestChain', () => {
    expect(AuroraTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(AuroraTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(AuroraTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.mainnet.testnet.dev/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(AuroraTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.mainnet.aurora.dev/tx/${TEST_TX}`)
  })
})
