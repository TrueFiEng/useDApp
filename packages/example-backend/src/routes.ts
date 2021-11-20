import { formatEther } from '@ethersproject/units'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { DAppService } from './dAppService'

export const routes = (server: FastifyInstance, dAppService: DAppService) => {
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

  server.get('/ping', opts, async () => {
    return { pong: 'it worked!' }
  })

  server.get('/block', async () => {
    const blockNumber = dAppService.blockNumber
    return { blockNumber }
  })

  server.get('/blockmeta', async () => {
    const { unsubscribe, value } = dAppService.useBlockMeta()
    const blockMeta = await value
    unsubscribe?.()

    return { ...blockMeta }
  })

  const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'
  server.get('/balance', async () => {
    const { unsubscribe, value } = dAppService.useEtherBalance(STAKING_CONTRACT)
    const balance = await value
    unsubscribe?.()

    return { eth2StakingContract: balance ? formatEther(balance) : undefined }
  })
}
