import { formatEther } from '@ethersproject/units'
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { UseDapp } from './usedapp'

export const routes = (server: FastifyInstance, useDapp: UseDapp) => {
  const opts: RouteShorthandOptions = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            pong: {
              type: 'string'
            }
          }
        }
      }
    }
  }
  
  server.get('/ping', opts, async (request, reply) => {
    return { pong: 'it worked!' }
  })

  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'
  server.get('/:chainId/balance', async (request, reply) => {
    const {chainId} = request.params as any
    console.log({chainId})
    const balance = 1;
    return {eth2StakingContract: formatEther(balance)}
  })
}
