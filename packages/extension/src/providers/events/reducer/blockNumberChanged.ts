import type { BlockNumberChangedPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { timestampToTime } from './timestampToTime'

export function blockNumberChanged(state: State, message: HookMessage<BlockNumberChangedPayload>): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'BLOCK_FOUND',
        network: chainIdToNetwork(message.payload.chainId),
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
      },
    ],
  }
}
