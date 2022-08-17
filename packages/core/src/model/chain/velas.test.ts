import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './test-defaults'
import { Velas, VelasTestnet } from '../../../src'

describe('Velas Chain', () => {
  it('getChainId', () => {
    expect(Velas.chainId).to.equal(106)
    expect(VelasTestnet.chainId).to.equal(111)
  })

  it('getChainName', () => {
    expect(Velas.chainName).to.eq('Velas Mainnet')
    expect(VelasTestnet.chainName).to.eq('Velas Testnet')
  })

  it('isTestChain', () => {
    expect(Velas.isTestChain).to.be.false
    expect(VelasTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Velas.isLocalChain).to.be.false
    expect(VelasTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Velas.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://evmexplorer.velas.com/address/${TEST_ADDRESS}`)
    expect(VelasTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://evmexplorer.testnet.velas.com/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Velas.getExplorerTransactionLink(TEST_TX)).to.eq(`https://evmexplorer.velas.com/tx/${TEST_TX}`)
    expect(VelasTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://evmexplorer.testnet.velas.com/tx/${TEST_TX}`
    )
  })
})
