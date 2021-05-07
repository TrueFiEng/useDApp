import type { GenericErrorPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { timestampToTime } from './timestampToTime'

export function genericError(state: State, message: HookMessage<GenericErrorPayload>): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'ERROR',
        time: timestampToTime(message.timestamp),
        error: message.payload.error,
      },
    ],
  }
}
