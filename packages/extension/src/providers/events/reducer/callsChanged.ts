import type { CallsChangedPayload, ChainCall, HookMessage } from '../Message'
import type { State } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { offsetToTime } from './time'

export function callsChanged(state: State, message: HookMessage<CallsChangedPayload>): State {
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

  const network = message.payload.chainId !== undefined ? chainIdToNetwork(message.payload.chainId) : undefined
  return {
    ...state,
    calls: message.payload.calls,
    events: [
      ...state.events,
      {
        type: 'CALLS_UPDATED',
        time: offsetToTime(state.initTimestamp, message.timestamp),
        network,
        added: [...addedCalls],
        removed: [...removedCalls],
        persisted: [...persistedCalls],
      },
    ],
  }
}
