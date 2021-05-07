import type { AccountChangedPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { timestampToTime } from './timestampToTime'

export function accountChanged(state: State, message: HookMessage<AccountChangedPayload>): State {
  if (message.payload.address === state.account) {
    return state
  }

  if (!message.payload.address) {
    return {
      ...state,
      account: undefined,
      events: [
        ...state.events,
        {
          type: 'ACCOUNT_DISCONNECTED',
          time: timestampToTime(message.timestamp),
        },
      ],
    }
  }

  return {
    ...state,
    account: message.payload.address,
    events: [
      ...state.events,
      {
        type: 'ACCOUNT_CONNECTED',
        time: timestampToTime(message.timestamp),
        address: message.payload.address,
      },
    ],
  }
}
