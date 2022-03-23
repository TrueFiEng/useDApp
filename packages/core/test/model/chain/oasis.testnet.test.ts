import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { OasisEmeraldTestnet } from '../../../src'

describe('Oasis Emerald Chain', () => {
  it('getChainId', () => {
    expect(OasisEmeraldTestnet.chainId).to.equal(42261)
  })

  it('getChainName', () => {
    expect(OasisEmeraldTestnet.chainName).to.eq('OasisEmeraldTestnet')
  })

  it('isTestChain', () => {
    expect(OasisEmeraldTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(OasisEmeraldTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(OasisEmeraldTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://testnet.explorer.emerald.oasis.dev/address/${TEST_ADDRESS}/transactions`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(OasisEmeraldTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://testnet.explorer.emerald.oasis.dev/tx/${TEST_TX}/internal-transactions`
    )
  })
})
