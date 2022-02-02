import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Boba, BobaRinkeby } from '../../../src'

describe('Boba Chain', () => {
  it('getChainId', () => {
    expect(Boba.chainId).to.equal(288)
    expect(BobaRinkeby.chainId).to.equal(28)
  })

  it('getChainName', () => {
    expect(Boba.chainName).to.eq('Boba')
    expect(BobaRinkeby.chainName).to.eq('BobaRinkeby')
  })

  it('isTestChain', () => {
    expect(Boba.isTestChain).to.be.false
    expect(BobaRinkeby.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Boba.isLocalChain).to.be.false
    expect(BobaRinkeby.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Boba.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://blockexplorer.boba.network/address/${TEST_ADDRESS}`
    )
    expect(BobaRinkeby.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://blockexplorer.rinkeby.boba.network/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Boba.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockexplorer.boba.network/tx/${TEST_TX}`)
    expect(BobaRinkeby.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://blockexplorer.rinkeby.boba.network/tx/${TEST_TX}`
    )
  })
})
