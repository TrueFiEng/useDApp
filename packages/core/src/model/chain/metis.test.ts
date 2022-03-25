import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Andromeda, Stardust } from '../../../src'

describe('Andromeda Chain', () => {
  it('getChainId', () => {
    expect(Andromeda.chainId).to.equal(1088)
    expect(Stardust.chainId).to.equal(588)
  })

  it('getChainName', () => {
    expect(Andromeda.chainName).to.eq('Andromeda')
    expect(Stardust.chainName).to.eq('Stardust')
  })

  it('isTestChain', () => {
    expect(Andromeda.isTestChain).to.be.false
    expect(Stardust.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Andromeda.isLocalChain).to.be.false
    expect(Stardust.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Andromeda.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://andromeda-explorer.metis.io/address/${TEST_ADDRESS}`
    )
    expect(Stardust.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://stardust-explorer.metis.io/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Andromeda.getExplorerTransactionLink(TEST_TX)).to.eq(`https://andromeda-explorer.metis.io/tx/${TEST_TX}`)
    expect(Stardust.getExplorerTransactionLink(TEST_TX)).to.eq(`https://stardust-explorer.metis.io/tx/${TEST_TX}`)
  })
})
