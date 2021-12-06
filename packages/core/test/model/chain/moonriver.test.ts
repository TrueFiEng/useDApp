import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Moonriver, MoonbaseAlpha } from '../../../src'

describe('Moonriver Chain', () => {
  it('getChainId', () => {
    expect(Moonriver.chainId).to.equal(1285)
    expect(MoonbaseAlpha.chainId).to.equal(1287)
  })

  it('getChainName', () => {
    expect(Moonriver.chainName).to.eq('Moonriver')
    expect(MoonbaseAlpha.chainName).to.eq('Moonbase Alpha')
  })

  it('isTestChain', () => {
    expect(Moonriver.isTestChain).to.be.false
    expect(MoonbaseAlpha.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Moonriver.isLocalChain).to.be.false
    expect(MoonbaseAlpha.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Moonriver.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://blockscout.moonriver.moonbeam.network/address/${TEST_ADDRESS}/transactions`
    )
    expect(MoonbaseAlpha.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://moonbase.moonscan.io/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Moonriver.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://blockscout.moonriver.moonbeam.network/tx/${TEST_TX}/internal-transactions`
    )
    expect(MoonbaseAlpha.getExplorerTransactionLink(TEST_TX)).to.eq(`https://moonbase.moonscan.io/tx/${TEST_TX}`)
  })
})
