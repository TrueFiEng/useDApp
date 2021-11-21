import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Fantom } from '../../../src'

describe('Fantom Chain', () => {
  it('getChainName', () => {
    expect(Fantom.chainName).to.eq('Fantom')
  })

  it('isTestChain', () => {
    expect(Fantom.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Fantom.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Fantom.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://ftmscan.com/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Fantom.getExplorerTransactionLink(TEST_TX)).to.eq(`https://ftmscan.com/tx/${TEST_TX}`)
  })
})
