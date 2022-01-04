import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Cronos } from '../../../src'

describe('Cronos Chain', () => {
  it('getChainId', () => {
    expect(Cronos.chainId).to.equal(25)
  })

  it('getChainName', () => {
    expect(Cronos.chainName).to.eq('Cronos')
  })

  it('isTestChain', () => {
    expect(Cronos.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Cronos.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Cronos.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://cronos.crypto.org/explorer/address/${TEST_ADDRESS}/transactions`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Cronos.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://cronos.crypto.org/explorer/tx/${TEST_TX}/internal-transactions`
    )
  })
})
