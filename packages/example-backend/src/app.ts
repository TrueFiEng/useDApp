import { ChainId, Config, DAppService, DEFAULT_SUPPORTED_CHAINS } from '@usedapp/core'
import Fastify, { FastifyInstance } from 'fastify'
import { routes } from './routes'

const MULTICALL_ADDRESSES: { [index: number]: string } = {}
DEFAULT_SUPPORTED_CHAINS.filter((network) => network.multicallAddress).map(
  (network) => (MULTICALL_ADDRESSES[network.chainId] = network.multicallAddress)
)

const config: Config = {
  readOnlyUrls: {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/3165a249c65f4198bf57200109b8fadf',
  },
  multicallAddresses: MULTICALL_ADDRESSES,
}

const server: FastifyInstance = Fastify({})
const mainnetService = new DAppService(config, ChainId.Mainnet)

export const startApp = async (port: number | string) => {
  try {
    await mainnetService.start()
    routes(server, mainnetService)
    await server.listen(port)
    console.log(`Server listening on port ${port}.`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }

  return {
    stopApp: () => {
      server.close()
      mainnetService.stop()
    },
    server,
  }
}
