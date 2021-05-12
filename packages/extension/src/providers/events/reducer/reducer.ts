import type {
  AccountChangedPayload,
  BlockNumberChangedPayload,
  CallsChangedPayload,
  GenericErrorPayload,
  HookMessage,
  InitPayload,
  Message,
  MulticallErrorPayload,
  MulticallSuccessPayload,
  NetworkChangedPayload,
  ReplayMessage,
} from '../Message'
import type { State } from '../State'
import { accountChanged } from './accountChanged'
import { blockNumberChanged } from './blockNumberChanged'
import { callsChanged } from './callsChanged'
import { genericError } from './genericError'
import { init } from './init'
import { multicallError } from './multicallError'
import { multicallSuccess } from './multicallSuccess'
import { networkChanged } from './networkChanged'

export const INITIAL_STATE: State = {
  currentNetwork: undefined,
  account: undefined,
  initTimestamp: 0,
  blockNumbers: {},
  state: {},
  calls: [],
  events: [],
}

export function reducer(state: State, message: Message) {
  if (message.source === 'usedapp-content') {
    if (message.payload.type === 'REPLAY') {
      return replay(state, message)
    } else {
      return state
    }
  }
  switch (message.payload.type) {
    case 'INIT':
      return init(state, message as HookMessage<InitPayload>)
    case 'NETWORK_CHANGED':
      return networkChanged(state, message as HookMessage<NetworkChangedPayload>)
    case 'BLOCK_NUMBER_CHANGED':
      return blockNumberChanged(state, message as HookMessage<BlockNumberChangedPayload>)
    case 'ACCOUNT_CHANGED':
      return accountChanged(state, message as HookMessage<AccountChangedPayload>)
    case 'CALLS_CHANGED':
      return callsChanged(state, message as HookMessage<CallsChangedPayload>)
    case 'MULTICALL_SUCCESS':
      return multicallSuccess(state, message as HookMessage<MulticallSuccessPayload>)
    case 'MULTICALL_ERROR':
      return multicallError(state, message as HookMessage<MulticallErrorPayload>)
    case 'GENERIC_ERROR':
      return genericError(state, message as HookMessage<GenericErrorPayload>)
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
