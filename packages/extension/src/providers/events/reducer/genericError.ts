import type { GenericErrorPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { offsetToTime } from './time'

export function genericError(state: State, message: HookMessage<GenericErrorPayload>): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'ERROR',
        time: offsetToTime(state.initTimestamp, message.timestamp),
        error: message.payload.error,
      },
    ],
  }
}
