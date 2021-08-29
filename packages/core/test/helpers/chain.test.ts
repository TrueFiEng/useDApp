import { expect } from 'chai'
import { ChainId } from '../../src'
import {
  getChainName,
  getExplorerAddressLink,
  isTestChain,
  getExplorerTransactionLink,
  isLocalChain,
} from '../../src/helpers/chain'

describe('Chain helpers', () => {
  it('getChainName', () => {
    expect(getChainName(ChainId.Mainnet)).to.eq('Mainnet')
    expect(getChainName(ChainId.Ropsten)).to.eq('Ropsten')
    expect(getChainName(ChainId.Kovan)).to.eq('Kovan')
    expect(getChainName(ChainId.Rinkeby)).to.eq('Rinkeby')
    expect(getChainName(ChainId.Goerli)).to.eq('Goerli')
    expect(getChainName(ChainId.BSC)).to.eq('BSC')
    expect(getChainName(ChainId.xDai)).to.eq('xDai')
    expect(getChainName(ChainId.Polygon)).to.eq('Polygon')
    expect(getChainName(ChainId.Mumbai)).to.eq('Mumbai')
    expect(getChainName(ChainId.Harmony)).to.eq('Harmony')
    expect(getChainName(ChainId.Moonriver)).to.eq('Moonriver')
  })

  it('isTestChain', () => {
    expect(isTestChain(ChainId.Mainnet)).to.be.false
    expect(isTestChain(ChainId.Ropsten)).to.be.true
    expect(isTestChain(ChainId.Kovan)).to.be.true
    expect(isTestChain(ChainId.Rinkeby)).to.be.true
    expect(isTestChain(ChainId.Goerli)).to.be.true
    expect(isTestChain(ChainId.BSC)).to.be.false
    expect(isTestChain(ChainId.xDai)).to.be.false
    expect(isTestChain(ChainId.Polygon)).to.be.false
    expect(isTestChain(ChainId.Mumbai)).to.be.true
    expect(isTestChain(ChainId.Harmony)).to.be.false
    expect(isTestChain(ChainId.Moonriver)).to.be.false
  })

  it('isLocalChain', () => {
    expect(isLocalChain(ChainId.Mainnet)).to.be.false
    expect(isLocalChain(ChainId.Ropsten)).to.be.false
    expect(isLocalChain(ChainId.Kovan)).to.be.false
    expect(isLocalChain(ChainId.Rinkeby)).to.be.false
    expect(isLocalChain(ChainId.Goerli)).to.be.false
    expect(isLocalChain(ChainId.xDai)).to.be.false
    expect(isLocalChain(ChainId.Harmony)).to.be.false
    expect(isLocalChain(ChainId.Localhost)).to.be.true
    expect(isLocalChain(ChainId.Hardhat)).to.be.true
    expect(isLocalChain(ChainId.Moonriver)).to.be.false
  })

  it('getExplorerAddressLink', () => {
    const address = '0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    expect(getExplorerAddressLink(address, ChainId.Mainnet)).to.eq(
      'https://etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.Ropsten)).to.eq(
      'https://ropsten.etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.Kovan)).to.eq(
      'https://kovan.etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.Rinkeby)).to.eq(
      'https://rinkeby.etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.Goerli)).to.eq(
      'https://goerli.etherscan.io/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.BSC)).to.eq(
      'https://bscscan.com/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.xDai)).to.eq(
      'https://blockscout.com/poa/xdai/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987/transactions'
    )
    expect(getExplorerAddressLink(address, ChainId.Polygon)).to.eq(
      'https://explorer-mainnet.maticvigil.com/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987/transactions'
    )
    expect(getExplorerAddressLink(address, ChainId.Mumbai)).to.eq(
      'https://explorer-mumbai.maticvigil.com/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987/transactions'
    )
    expect(getExplorerAddressLink(address, ChainId.Harmony)).to.eq(
      'https://explorer.harmony.one/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987'
    )
    expect(getExplorerAddressLink(address, ChainId.Moonriver)).to.eq(
      'https://blockscout.moonriver.moonbeam.network/address/0xC7095A52C403ee3625Ce8B9ae8e2e46083b81987/transactions'
    )
  })

  it('getExplorerTransactionLink', () => {
    const tx = '0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    expect(getExplorerTransactionLink(tx, ChainId.Mainnet)).to.eq(
      'https://etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Ropsten)).to.eq(
      'https://ropsten.etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Kovan)).to.eq(
      'https://kovan.etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Rinkeby)).to.eq(
      'https://rinkeby.etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Goerli)).to.eq(
      'https://goerli.etherscan.io/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.BSC)).to.eq(
      'https://bscscan.com/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.xDai)).to.eq(
      'https://blockscout.com/poa/xdai/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a/internal-transactions'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Polygon)).to.eq(
      'https://explorer-mainnet.maticvigil.com/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a/internal-transactions'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Mumbai)).to.eq(
      'https://explorer-mumbai.maticvigil.com/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a/internal-transactions'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Harmony)).to.eq(
      'https://explorer.harmony.one/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a'
    )
    expect(getExplorerTransactionLink(tx, ChainId.Moonriver)).to.eq(
      'https://blockscout.moonriver.moonbeam.network/tx/0x5d53558791c9346d644d077354420f9a93600acf54eb6a279f12b43025392c3a/internal-transactions'
    )
  })
})
