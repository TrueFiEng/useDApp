import { MockProvider } from '@ethereum-waffle/provider'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'
import { startApp } from '../src/app'

export type Awaited<T> = T extends Promise<infer U> ? U : T
chai.use(solidity)
chai.use(chaiAsPromised)

describe('Basic', () => {
  const mockProvider = new MockProvider()
  // const [deployer] = mockProvider.getWallets()
  let stopApp: Awaited<ReturnType<typeof startApp>>['stopApp']
  let server: Awaited<ReturnType<typeof startApp>>['server']

  before(async () => {
    ;({ stopApp, server } = await startApp(3000))
  })
  after(() => stopApp())

  it('Plays ping pong', async () => {
    const response = await server.inject('/ping')
    expect(response.json()).to.deep.equal({ pong: 'it worked!' })
  })
})
