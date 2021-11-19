import { MockProvider } from '@ethereum-waffle/provider'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { server, start } from '../src/server'

export type Awaited<T> = T extends Promise<infer U> ? U : T;
chai.use(solidity)
chai.use(chaiAsPromised)

describe('Basic', () => {
  const mockProvider = new MockProvider()
  const [deployer] = mockProvider.getWallets()
  let server: Awaited<ReturnType<typeof start>>

  before(async () => {
    server = await start(3000)
  })
  after(async () => server.close())

  it('Plays ping pong', async () => {
    const response = await server.inject('/ping')
    expect(response.json()).to.deep.equal({ pong: 'it worked!' })
  })
})
