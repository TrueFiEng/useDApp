import { expect } from 'chai'
import { getProvidersFromConfig } from '../../src/providers/network/readonlyNetworks/provider'
import { Kovan, Mainnet, Rinkeby } from '../../src'
import { JsonRpcProvider } from '@ethersproject/providers'

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
    expect(providers[Mainnet.chainId].connection.url).to.equal('mainnetUrl')
    expect(providers[Rinkeby.chainId].connection.url).to.equal('rinkebyUrl')
    expect(providers[Kovan.chainId].connection.url).to.equal('kovanUrl')
  })
})
