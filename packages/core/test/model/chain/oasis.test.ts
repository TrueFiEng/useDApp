import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { OasisEmerald, OasisEmeraldTestnet } from '../../../src'

describe('Oasis Emerald Chain', () => {
  it('getChainId', () => {
    expect(OasisEmerald.chainId).to.equal(42262)
    expect(OasisEmeraldTestnet.chainId).to.equal(42261)
  })

  it('getChainName', () => {
    expect(OasisEmerald.chainName).to.eq('OasisEmerald')
    expect(OasisEmeraldTestnet.chainId).to.equal('OasisEmeraldTestnet')
  })

  it('isTestChain', () => {
    expect(OasisEmerald.isTestChain).to.be.false
    expect(OasisEmeraldTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(OasisEmerald.isLocalChain).to.be.false
    expect(OasisEmeraldTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(OasisEmerald.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://explorer.emerald.oasis.dev/address/${TEST_ADDRESS}/transactions`
    )
    expect(OasisEmeraldTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://testnet.explorer.emerald.oasis.dev/address/${TEST_ADDRESS}/transactions`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(OasisEmerald.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://explorer.emerald.oasis.dev/tx/${TEST_TX}/internal-transactions`
    )
    expect(OasisEmeraldTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://testnet.explorer.emerald.oasis.dev/tx/${TEST_TX}/internal-transactions`
    )
  })
})
