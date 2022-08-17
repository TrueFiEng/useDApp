import type { BlockNumberChangedPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { offsetToTime } from './time'

export function blockNumberChanged(state: State, message: HookMessage<BlockNumberChangedPayload>): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'BLOCK_FOUND',
        network: chainIdToNetwork(message.payload.chainId),
        time: offsetToTime(state.initTimestamp, message.timestamp),
        blockNumber: message.payload.blockNumber,
      },
    ],
  }
}
