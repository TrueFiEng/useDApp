import type { AccountChangedPayload, HookMessage } from '../Message'
import type { State } from '../State'
import { offsetToTime } from './time'

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
          time: offsetToTime(state.initTimestamp, message.timestamp),
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
        time: offsetToTime(state.initTimestamp, message.timestamp),
        address: message.payload.address,
      },
    ],
  }
}
