import type { CallsChangedMessage, ChainCall } from '../Message'
import type { State } from '../State'
import { timestampToTime } from './timestampToTime'

export function callsChanged(state: State, message: CallsChangedMessage): State {
  const addedCalls = new Set<ChainCall>()
  const removedCalls = new Set<ChainCall>()
  const persistedCalls = new Set<ChainCall>()

  for (const call of message.payload.calls) {
    const existing = state.calls.find((x) => x.address === call.address && x.data === call.data)
    if (existing) {
      persistedCalls.add(existing)
    } else {
      addedCalls.add(call)
    }
  }
  for (const call of state.calls) {
    if (!persistedCalls.has(call)) {
      removedCalls.add(call)
    }
  }

  return {
    ...state,
    calls: message.payload.calls,
    events: [
      ...state.events,
      {
        type: 'CALLS_UPDATED',
        time: timestampToTime(message.timestamp),
        network: state.currentNetwork,
        addedCalls: [...addedCalls],
        removedCalls: [...removedCalls],
        persistedCalls: [...persistedCalls],
      },
    ],
  }
}
