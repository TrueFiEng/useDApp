import { expect } from 'chai'
import { ChainId } from '../../src'
import { getChainName, isLocalChain, isTestChain } from './chain'

describe('chain', () => {
  const mainnet = ChainId.Mainnet
  const ropsten = ChainId.Ropsten
  const ganache = ChainId.Localhost

  it('returns correct chain name from id', () => {
    const mainnetName = getChainName(mainnet)
    expect(mainnetName).to.eq('Mainnet')
  })

  it('tells correct if chain is test', () => {
    const isMainnetTest = isTestChain(mainnet)
    const isRopstenTest = isTestChain(ropsten)
    expect(isMainnetTest).to.be.false
    expect(isRopstenTest).to.be.true
  })

  it('tells correct if chain is local', () => {
    const isMainnetLocal = isLocalChain(mainnet)
    const isGanacheLocal = isLocalChain(ganache)
    expect(isMainnetLocal).to.be.false
    expect(isGanacheLocal).to.be.true
  })
})
