import type { BlockNumberChangedPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { timestampToTime } from './timestampToTime'

export function blockNumberChanged(state: State, message: HookMessage<BlockNumberChangedPayload>): State {
  const network = chainIdToNetwork(message.payload.chainId)
  return {
    ...state,
    blockNumbers: {
      ...state.blockNumbers,
      [network]: message.payload.blockNumber,
    },
    events: [
      ...state.events,
      {
        type: 'BLOCK_FOUND',
        network,
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
      },
    ],
  }
}
