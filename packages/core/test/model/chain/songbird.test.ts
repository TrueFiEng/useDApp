import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Songbird } from '../../../src'

describe('Songbird Chain', () => {
  it('getChainId', () => {
    expect(Songbird.chainId).to.equal(19)
  })

  it('getChainName', () => {
    expect(Songbird.chainName).to.eq('Songbird')
  })

  it('isTestChain', () => {
    expect(Songbird.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Songbird.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Songbird.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://songbird-explorer.flare.network/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Songbird.getExplorerTransactionLink(TEST_TX)).to.eq(`https://songbird-explorer.flare.network/tx/${TEST_TX}`)
  })
})
