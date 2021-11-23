import { expect } from 'chai'
import { TEST_ADDRESS, TEST_TX } from './defaults'
import { Theta, ThetaTestnet } from '../../../src'

describe('Theta Chain', () => {
  it('getChainId', () => {
    expect(Theta.chainId).to.equal(361)
    expect(Theta.chainId).to.equal(365)
  })

  it('getChainName', () => {
    expect(Theta.chainName).to.eq('Theta')
    expect(ThetaTestnet.chainName).to.eq('ThetaTestnet')
  })

  it('isTestChain', () => {
    expect(Theta.isTestChain).to.be.false
    expect(ThetaTestnet.isTestChain).to.be.true
  })

  it('isLocalChain', () => {
    expect(Theta.isLocalChain).to.be.false
    expect(ThetaTestnet.isLocalChain).to.be.false
  })

  it('getExplorerAddressLink', () => {
    expect(Theta.getExplorerAddressLink(TEST_ADDRESS)).to.eq(`https://explorer.thetatoken.org/address/${TEST_ADDRESS}`)
    expect(ThetaTestnet.getExplorerAddressLink(TEST_ADDRESS)).to.eq(
      `https://testnet-explorer.thetatoken.org/address/${TEST_ADDRESS}`
    )
  })

  it('getExplorerTransactionLink', () => {
    expect(Theta.getExplorerTransactionLink(TEST_TX)).to.eq(`https://explorer.thetatoken.org/tx/${TEST_TX}`)
    expect(ThetaTestnet.getExplorerTransactionLink(TEST_TX)).to.eq(
      `https://testnet-explorer.thetatoken.org/tx/${TEST_TX}`
    )
  })
})
