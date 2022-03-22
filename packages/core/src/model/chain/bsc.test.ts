import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { BSC, BSCTestnet } from '../../../src'

describe('BSC Chain', () => {
  it('getChainId', () => {
    expect(BSC.chainId).to.equal(56)
    expect(BSCTestnet.chainId).to.equal(97)
  })

  it('getChainName', () => {
    expect(BSC.chainName).to.eq('BSC')
    expect(BSCTestnet.chainName).to.eq('BSCTestnet')
  })

  it('isTestChain', () => {
    expect(BSC.isTestChain).to.be.false
    expect(BSCTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(BSC.isLocalChain).to.be.false
    expect(BSCTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(BSC.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://bscscan.com/address/${TEST_ADDRESS}`)
    expect(BSCTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://testnet.bscscan.com/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(BSC.getExplorerTransactionLink(TEST_TX)).to.eq(`https://bscscan.com/tx/${TEST_TX}`)
    expect(BSCTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.bscscan.com/tx/${TEST_TX}`)
  })
})
