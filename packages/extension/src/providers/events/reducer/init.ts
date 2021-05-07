import type { HookMessage, InitPayload } from '../Message'
import type { State } from '../State'
import { INITIAL_STATE } from './reducer'
import { timestampToTime } from './timestampToTime'

export function init(state: State, message: HookMessage<InitPayload>): State {
  return {
    ...INITIAL_STATE,
    events: [
      {
        type: 'INIT',
        time: timestampToTime(message.timestamp),
      },
    ],
  }
}
