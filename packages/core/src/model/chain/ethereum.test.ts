import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Mainnet, Ropsten, Kovan, Rinkeby, Goerli } from '../../../src'

describe('Ethereum Chain', () => {
  it('getChainId', () => {
    expect(Mainnet.chainId).to.equal(1)
    expect(Ropsten.chainId).to.equal(3)
    expect(Rinkeby.chainId).to.equal(4)
    expect(Goerli.chainId).to.equal(5)
    expect(Kovan.chainId).to.equal(42)
  })

  it('getChainName', () => {
    expect(Mainnet.chainName).to.eq('Ethereum Mainnet')
    expect(Ropsten.chainName).to.eq('Ropsten')
    expect(Kovan.chainName).to.eq('Kovan')
    expect(Rinkeby.chainName).to.eq('Rinkeby')
    expect(Goerli.chainName).to.eq('Goerli')
  })

  it('isTestChain', () => {
    expect(Mainnet.isTestChain).to.be.false
    expect(Ropsten.isTestChain).to.be.true
    expect(Kovan.isTestChain).to.be.true
    expect(Rinkeby.isTestChain).to.be.true
    expect(Goerli.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Mainnet.isLocalChain).to.be.false
    expect(Ropsten.isLocalChain).to.be.false
    expect(Kovan.isLocalChain).to.be.false
    expect(Rinkeby.isLocalChain).to.be.false
    expect(Goerli.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Mainnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://etherscan.io/address/${TEST_ADDRESS}`)
    expect(Ropsten.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://ropsten.etherscan.io/address/${TEST_ADDRESS}`)
    expect(Kovan.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://kovan.etherscan.io/address/${TEST_ADDRESS}`)
    expect(Rinkeby.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://rinkeby.etherscan.io/address/${TEST_ADDRESS}`)
    expect(Goerli.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://goerli.etherscan.io/address/${TEST_ADDRESS}`)
  })

  it('getExplorerTransactionLink', () => {
    expect(Mainnet.getExplorerTransactionLink(TEST_TX)).to.eq(`https://etherscan.io/tx/${TEST_TX}`)
    expect(Ropsten.getExplorerTransactionLink(TEST_TX)).to.eq(`https://ropsten.etherscan.io/tx/${TEST_TX}`)
    expect(Kovan.getExplorerTransactionLink(TEST_TX)).to.eq(`https://kovan.etherscan.io/tx/${TEST_TX}`)
    expect(Rinkeby.getExplorerTransactionLink(TEST_TX)).to.eq(`https://rinkeby.etherscan.io/tx/${TEST_TX}`)
    expect(Goerli.getExplorerTransactionLink(TEST_TX)).to.eq(`https://goerli.etherscan.io/tx/${TEST_TX}`)
  })
})
