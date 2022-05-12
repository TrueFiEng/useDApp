import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Boba } from '../..'

describe('Boba Chain', () => {
  it('getChainId', () => {
    expect(Boba.chainId).to.equal(288)
  })

  it('getChainName', () => {
    expect(Boba.chainName).to.eq('Boba')
  })

  it('isTestChain', () => {
    expect(Boba.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Boba.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Boba.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://blockexplorer.boba.network/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Boba.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockexplorer.boba.network/tx/${TEST_TX}`)
  })
})
