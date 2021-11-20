import { formatEther } from '@ethersproject/units'
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { DAppService, EtherBalance } from './dAppService'

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

  server.get('/ping', opts, async (request, reply) => {
    return { pong: 'it worked!' }
  })

  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'
  server.get('/balance', async (request, reply) => {
    // An endpoint that busy waits is terrible.
    const balance = await new Promise<EtherBalance>((res, rej) => {
      const unsub = dAppService.useEtherBalance(STAKING_CONTRACT, res)
    })
    return { eth2StakingContract: balance ? formatEther(balance) : undefined }
  })

  server.get('/block', async (request, reply) => {
    const blockNumber = dAppService.blockNumber
    return { blockNumber }
  })
}
