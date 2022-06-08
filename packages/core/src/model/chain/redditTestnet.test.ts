import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { ArbitrumRedditTestnet } from '../../'

describe('RedditTestnet Chain', () => {
  it('getChainId', () => {
    expect(ArbitrumRedditTestnet.chainId).to.equal(5391184)
  })

  it('getChainName', () => {
    expect(ArbitrumRedditTestnet.chainName).to.eq('RedditTestnet')
  })

  it('isTestChain', () => {
    expect(ArbitrumRedditTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(ArbitrumRedditTestnet.isLocalChain).to.be.false
  })

  it('rpcUrl', () => {
    expect(ArbitrumRedditTestnet.rpcUrl).to.eq('https://testnet.redditspace.com/rpc')
  })

  it('getExplorerAddressLink', () => {
    expect(ArbitrumRedditTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://testnet.redditspace.com/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(ArbitrumRedditTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://testnet.redditspace.com/tx/${TEST_TX}`)
  })
})
