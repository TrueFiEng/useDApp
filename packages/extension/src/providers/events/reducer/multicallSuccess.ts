import type { HookMessage, MulticallSuccessPayload } from '../Message'
import type { State, StateEntry, StateUpdate } from '../State'
import { chainIdToNetwork } from './chainIdToNetwork'
import { offsetToTime } from './time'

export function multicallSuccess(state: State, message: HookMessage<MulticallSuccessPayload>): State {
  const network = chainIdToNetwork(message.payload.chainId)
  if (state.blockNumbers[network] > message.payload.blockNumber) {
    return state
  }

  const previousEntries = state.state[network] ?? []
  const currentEntries = getStateEntries(message.payload.state)

  const updated: StateUpdate[] = []
  const persisted: StateEntry[] = []
  const known = new Set<StateEntry>()
  for (const entry of previousEntries) {
    const corresponding = currentEntries.find((x) => x.address === entry.address && x.data === entry.data)
    if (corresponding?.value !== entry.value) {
      if (state.blockNumbers[network] === message.payload.blockNumber && corresponding?.value === undefined) {
        persisted.push(entry)
      } else {
        updated.push({
          address: entry.address,
          data: entry.data,
          previous: entry.value,
          current: corresponding?.value,
        })
        if (corresponding) {
          known.add(corresponding)
        }
      }
    } else {
      persisted.push(corresponding)
      known.add(corresponding)
    }
  }
  for (const entry of currentEntries) {
    if (!known.has(entry)) {
      updated.push({
        address: entry.address,
        data: entry.data,
        previous: undefined,
        current: entry.value,
      })
    }
  }

  const entries = updated
    .filter((x) => x.current !== undefined)
    .map((x) => ({
      address: x.address,
      data: x.data,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: x.current!,
    }))
    .concat(persisted)

  return {
    ...state,
    blockNumbers: {
      ...state.blockNumbers,
      [network]: message.payload.blockNumber,
    },
    state: {
      ...state.state,
      [network]: entries,
    },
    events: [
      ...state.events,
      {
        type: 'STATE_UPDATED',
        time: offsetToTime(state.initTimestamp, message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: network,
        updated,
        persisted,
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
