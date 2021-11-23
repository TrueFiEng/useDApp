import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Avalanche } from '../../../src'

describe('Avalanche Chain', () => {
  it('getChainId', () => {
    expect(Avalanche.chainId).to.equal(43114)
  })

  it('getChainName', () => {
    expect(Avalanche.chainName).to.eq('Avalanche')
  })

  it('isTestChain', () => {
    expect(Avalanche.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Avalanche.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Avalanche.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://snowtrace.io/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Avalanche.getExplorerTransactionLink(TEST_TX)).to.eq(`https://snowtrace.io/tx/${TEST_TX}`)
  })
})
