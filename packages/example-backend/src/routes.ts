import { formatEther } from '@ethersproject/units'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { BlockMeta, DAppService, EtherBalance } from './dAppService'
import { latch } from './util'

export const routes = (server: FastifyInstance, dAppService: DAppService) => {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            pong: {
              type: 'string',
            },
          },
        },
      },
    },
  }

  server.get('/ping', opts, async () => {
    return { pong: 'it worked!' }
  })

  server.get('/block', async () => {
    const blockNumber = dAppService.blockNumber
    return { blockNumber }
  })

  server.get('/blockmeta', async () => {
    const [value, setValue] = latch<BlockMeta>()

    const unsub = dAppService.useBlockMeta(setValue)
    const blockMeta = await value
    unsub?.()

    return { ...blockMeta }
  })

  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'
  server.get('/balance', async () => {
    const [value, setValue] = latch<EtherBalance>()

    const unsub = dAppService.useEtherBalance(STAKING_CONTRACT, setValue)
    const balance = await value
    unsub?.()

    return { eth2StakingContract: balance ? formatEther(balance) : undefined }
  })
}
