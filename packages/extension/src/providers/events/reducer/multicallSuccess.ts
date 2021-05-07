import type { HookMessage, MulticallSuccessPayload } from '../Message'
import type { State, StateEntry, StateUpdate } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { timestampToTime } from './timestampToTime'

export function multicallSuccess(state: State, message: HookMessage<MulticallSuccessPayload>): State {
  const network = chainIdToNetwork(message.payload.chainId)

  const previousEntries = state.state[network] ?? []
  const currentEntries = getStateEntries(message.payload.state)

  const updated: StateUpdate[] = []
  const persisted = new Set<StateEntry>()
  for (const entry of previousEntries) {
    const corresponding = currentEntries.find((x) => x.address === entry.address && x.data === entry.data)
    if (corresponding?.value !== entry.value) {
      updated.push({
        address: entry.address,
        data: entry.data,
        previous: entry.value,
        current: corresponding?.value,
      })
    } else {
      persisted.add(corresponding)
    }
  }
  for (const entry of currentEntries) {
    if (!persisted.has(entry)) {
      updated.push({
        address: entry.address,
        data: entry.data,
        previous: undefined,
        current: entry.value,
      })
    }
  }

  return {
    ...state,
    state: {
      ...state.state,
      [network]: currentEntries,
    },
    events: [
      ...state.events,
      {
        type: 'STATE_UPDATED',
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: network,
        updated,
        persisted: [...persisted],
      },
    ],
  }
}

function getStateEntries(state: { [address: string]: { [data: string]: string } }) {
  const entries = []
  for (const [address, calls] of Object.entries(state)) {
    for (const [data, value] of Object.entries(calls)) {
      entries.push({ address, data, value })
    }
  }
  return entries
}
