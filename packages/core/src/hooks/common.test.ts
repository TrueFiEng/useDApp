import { renderDAppHook, setupTestingConfig } from '../testing'
import Ganache, { Server } from 'ganache'
import { ApiNodeConnector } from '../providers/network/connector/impls/apiNode'
import { useEthers } from './useEthers'
import { useContext, useEffect } from 'react'
import { ConnectorContext } from '../providers'
import { useBlockNumber } from './useBlockNumber'
import { providers } from 'ethers'

describe('ApiNode connector', () => {
  let server: Server<'ethereum'>
  let rpcEndpoint: string
  let ganacheChainId: number

  before(async () => {
    const port = Math.ceil(Math.random() * 10000) + 10000
    rpcEndpoint = `http://localhost:${port}`
    ganacheChainId = 2038
    server = Ganache.server({
      chain: {
        chainId: ganacheChainId,
      },
      logging: {
        quiet: true,
      },
    })

    await server.listen(port)
  })

  after(async () => {
    await server.close()
  })

  it('Uses ApiNodeConnector as readonly connector', async () => {
    const { config: initialConfig } = await setupTestingConfig()

    const config: typeof initialConfig = {
      ...initialConfig,
      connectors: [...initialConfig.connectors!, new ApiNodeConnector(rpcEndpoint)],
    }

    const { waitForCurrent } = await renderDAppHook(
      () => {
        const { activate, chainId } = useEthers()
        const blockNumber = useBlockNumber()
        const { connectors } = useContext(ConnectorContext)!
        useEffect(() => {
          if (connectors.length > 0) {
            void activate({ tag: ApiNodeConnector.tag })
          }
        }, [connectors])

        return { chainId, blockNumber }
      },
      { config }
    )
    await waitForCurrent(({ chainId }) => ganacheChainId === chainId)

    const provider = new providers.JsonRpcProvider(rpcEndpoint)
    const startBlockNumber = await provider.getBlockNumber()
    await waitForCurrent(({ blockNumber }) => blockNumber === startBlockNumber)

    await provider.send('evm_mine', [])
    await provider.send('evm_mine', [])

    await waitForCurrent(({ blockNumber }) => blockNumber === startBlockNumber + 2)
  })
})
