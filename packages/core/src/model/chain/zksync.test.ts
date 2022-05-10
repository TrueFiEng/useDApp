import { expect } from 'chai'

import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { ZkSyncTestnet } from '../../../src'

describe('zkSync Chain', () => {
  it('getChainId', () => {
    expect(ZkSyncTestnet.chainId).to.equal(280)
  })

  it('getChainName', () => {
    expect(ZkSyncTestnet.chainName).to.eq('zkSync alpha testnet')
  })

  it('isTestChain', () => {
    expect(ZkSyncTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(ZkSyncTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(ZkSyncTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://zksync2-testnet.zkscan.io/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(ZkSyncTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://zksync2-testnet.zkscan.io/tx/${TEST_TX}`)
  })
})
