import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Optimism, OptimismKovan } from '../../../src'

describe('Optimism Chain', () => {
  it('getChainId', () => {
    expect(Optimism.chainId).to.equal(10)
    expect(OptimismKovan.chainId).to.equal(69)
  })

  it('getChainName', () => {
    expect(Optimism.chainName).to.eq('Optimism')
    expect(OptimismKovan.chainName).to.eq('OptimismKovan')
  })

  it('isTestChain', () => {
    expect(Optimism.isTestChain).to.be.false
    expect(OptimismKovan.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Optimism.isLocalChain).to.be.false
    expect(OptimismKovan.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Optimism.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://optimistic.etherscan.io/address/${TEST_ADDRESS}`
    )
    expect(OptimismKovan.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://kovan-optimistic.etherscan.io/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Optimism.getExplorerTransactionLink(TEST_TX)).to.eq(`https://optimistic.etherscan.io/tx/${TEST_TX}`)
    expect(OptimismKovan.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://kovan-optimistic.etherscan.io/tx/${TEST_TX}`
    )
  })
})
