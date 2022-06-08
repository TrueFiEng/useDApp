import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { RedditTestnet } from '../../'

describe('RedditTestnet Chain', () => {
  it('getChainId', () => {
    expect(RedditTestnet.chainId).to.equal(5391184)
  })

  it('getChainName', () => {
    expect(RedditTestnet.chainName).to.eq('RedditTestnet')
  })

  it('isTestChain', () => {
    expect(RedditTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(RedditTestnet.isLocalChain).to.be.false
  })

  it('rpcUrl', () => {
    expect(RedditTestnet.rpcUrl).to.eq('https://testnet.redditspace.com/rpc')
  })

  it('getExplorerAddressLink', () => {
    expect(RedditTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://testnet.redditspace.com/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(RedditTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.redditspace.com/tx/${TEST_TX}`)
  })
})
