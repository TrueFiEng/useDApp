import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Harmony } from '../../../src'

describe('Harmony Chain', () => {
  it('getChainName', () => {
    expect(Harmony.chainName).to.eq('Harmony')
  })

  it('isTestChain', () => {
    expect(Harmony.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Harmony.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Harmony.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.harmony.one/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Harmony.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.harmony.one/tx/${TEST_TX}`)
  })
})
