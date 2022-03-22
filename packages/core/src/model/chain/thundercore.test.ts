import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { ThunderCore, ThunderCoreTestnet } from '../../../src'

describe('ThunderCore Chain', () => {
  it('getChainId', () => {
    expect(ThunderCore.chainId).to.equal(108)
    expect(ThunderCoreTestnet.chainId).to.equal(18)
  })

  it('getChainName', () => {
    expect(ThunderCore.chainName).to.eq('ThunderCore Mainnet')
    expect(ThunderCoreTestnet.chainName).to.eq('ThunderCore Testnet')
  })

  it('isTestChain', () => {
    expect(ThunderCore.isTestChain).to.be.false
    expect(ThunderCoreTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(ThunderCore.isLocalChain).to.be.false
    expect(ThunderCoreTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(ThunderCore.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://viewblock.io/thundercore/address/${TEST_ADDRESS}`
    )
    expect(ThunderCoreTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://explorer-testnet.thundercore.com/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(ThunderCore.getExplorerTransactionLink(TEST_TX)).to.eq(`https://viewblock.io/thundercore/tx/${TEST_TX}`)
    expect(ThunderCoreTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://explorer-testnet.thundercore.com/tx/${TEST_TX}`
    )
  })
})
