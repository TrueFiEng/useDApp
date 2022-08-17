import { expect } from 'chai'
import { providers } from 'ethers'
import { getProvidersFromConfig } from './provider'
import { Kovan, Mainnet, Rinkeby, Localhost } from '../../../model/chain'
import { MockProvider } from 'ethereum-waffle'

const JsonRpcProvider = providers.JsonRpcProvider

describe('ReadonlyNetworksProvider', () => {
  it('getProvidersFromConfig creates provider for each network that has URL', async () => {
    const urls = {
      [Mainnet.chainId]: 'mainnetUrl',
      [Rinkeby.chainId]: 'rinkebyUrl',
      [Kovan.chainId]: 'kovanUrl',
    }
    const providers = getProvidersFromConfig(urls)
    expect(Object.keys(providers)).to.deep.equal([
      Mainnet.chainId.toString(),
      Rinkeby.chainId.toString(),
      Kovan.chainId.toString(),
    ])
    expect(providers[Mainnet.chainId]).to.be.instanceOf(JsonRpcProvider)
  })

  it('getProvidersFromConfig fetches provider object', async () => {
    const mockProvider = new MockProvider()
    const urls = {
      [Localhost.chainId]: mockProvider,
    }
    const providers = getProvidersFromConfig(urls)
    expect(Object.keys(providers)).to.deep.equal([Localhost.chainId.toString()])
    expect(providers[Localhost.chainId]).to.eq(mockProvider)
  })
})
