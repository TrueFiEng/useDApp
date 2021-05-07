import type {
  InitMessage,
  Message,
  ReplayMessage,
  NetworkChangedMessage,
  BlockNumberChangedMessage,
  CallsChangedMessage,
  MulticallSuccessMessage,
  MulticallErrorMessage,
} from '../Message'
import type { State } from '../State'
import { blockNumberChanged } from './blockNumberChanged'
import { callsChanged } from './callsChanged'
import { init } from './init'
import { multicallError } from './multicallError'
import { multicallSuccess } from './multicallSuccess'
import { networkChanged } from './networkChanged'

export const INITIAL_STATE: State = {
  currentNetwork: undefined,
  blockNumbers: {},
  state: {},
  calls: [],
  events: [],
}

export function reducer(state: State, message: Message) {
  switch (message.payload.type) {
    case 'REPLAY':
      return replay(state, message as ReplayMessage)
    case 'INIT':
      return init(state, message as InitMessage)
    case 'NETWORK_CHANGED':
      return networkChanged(state, message as NetworkChangedMessage)
    case 'BLOCK_NUMBER_CHANGED':
      return blockNumberChanged(state, message as BlockNumberChangedMessage)
    case 'CALLS_CHANGED':
      return callsChanged(state, message as CallsChangedMessage)
    case 'MULTICALL_SUCCESS':
      return multicallSuccess(state, message as MulticallSuccessMessage)
    case 'MULTICALL_ERROR':
      return multicallError(state, message as MulticallErrorMessage)
    default:
      return state
  }
}

function replay(state: State, message: ReplayMessage) {
  let newState = state
  for (const hookMessage of message.payload.messages) {
    newState = reducer(newState, hookMessage)
  }
  return newState
}
