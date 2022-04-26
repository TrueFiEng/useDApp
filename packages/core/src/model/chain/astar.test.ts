import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Astar } from '../..'

describe('Astar Chain', () => {
  it('getChainId', () => {
    expect(Astar.chainId).to.equal(592)
  })

  it('getChainName', () => {
    expect(Astar.chainName).to.eq('Astar')
  })

  it('isTestChain', () => {
    expect(Astar.isTestChain).to.be.false
  })

  it('isLocalChain', () => {
    expect(Astar.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Astar.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://blockscout.com/astar/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Astar.getExplorerTransactionLink(TEST_TX)).to.eq(`https://blockscout.com/astar/tx/${TEST_TX}`)
  })
})
