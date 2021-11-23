import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Polygon, Mumbai } from '../../../src'

describe('Polygon Chain', () => {
  it('getChainId', () => {
    expect(Polygon.chainId).to.equal(137)
    expect(Mumbai.chainId).to.equal(80001)
  })

  it('getChainName', () => {
    expect(Polygon.chainName).to.eq('Polygon')
    expect(Mumbai.chainName).to.eq('Mumbai')
  })

  it('isTestChain', () => {
    expect(Polygon.isTestChain).to.be.false
    expect(Mumbai.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Polygon.isLocalChain).to.be.false
    expect(Mumbai.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Polygon.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://explorer-mainnet.maticvigil.com/address/${TEST_ADDRESS}`
    )
    expect(Mumbai.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://explorer-mumbai.maticvigil.com/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Polygon.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer-mainnet.maticvigil.com/tx/${TEST_TX}`)
    expect(Mumbai.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer-mumbai.maticvigil.com/tx/${TEST_TX}`)
  })
})
