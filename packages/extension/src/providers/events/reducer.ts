import type {
  InitMessage,
  Message,
  ReplayMessage,
  NetworkChangedMessage,
  BlockNumberChangedMessage,
  CallsChangedMessage,
  MulticallSuccessMessage,
  MulticallErrorMessage,
  ChainCall,
} from './Message'
import type { State } from './State'

export const INITIAL_STATE: State = {
  currentNetwork: undefined,
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

function init(state: State, message: InitMessage): State {
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

function networkChanged(state: State, message: NetworkChangedMessage): State {
  if (message.payload.chainId === undefined) {
    if (state.currentNetwork === undefined) {
      return state
    }
    return {
      ...state,
      currentNetwork: undefined,
      events: [
        ...state.events,
        {
          type: 'NETWORK_DISCONNECTED',
          time: timestampToTime(message.timestamp),
        },
      ],
    }
  }

  const network = chainIdToNetwork(message.payload.chainId)
  if (state.currentNetwork === network) {
    return state
  }

  return {
    ...state,
    currentNetwork: network,
    events: [
      ...state.events,
      {
        type: 'NETWORK_CONNECTED',
        network,
        time: timestampToTime(message.timestamp),
      },
    ],
  }
}

function blockNumberChanged(state: State, message: BlockNumberChangedMessage): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'BLOCK_FOUND',
        network: chainIdToNetwork(message.payload.chainId),
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
      },
    ],
  }
}

function callsChanged(state: State, message: CallsChangedMessage): State {
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

function multicallSuccess(state: State, message: MulticallSuccessMessage): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'STATE_UPDATED',
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: chainIdToNetwork(message.payload.chainId),
        state: message.payload.state,
      },
    ],
  }
}

function multicallError(state: State, message: MulticallErrorMessage): State {
  return {
    ...state,
    events: [
      ...state.events,
      {
        type: 'FETCH_ERROR',
        time: timestampToTime(message.timestamp),
        blockNumber: message.payload.blockNumber,
        duration: message.payload.duration,
        multicallAddress: message.payload.multicallAddress,
        network: chainIdToNetwork(message.payload.chainId),
        calls: message.payload.calls,
        error: message.payload.error,
      },
    ],
  }
}

function timestampToTime(timestamp: number) {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function chainIdToNetwork(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Mainnet'
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 5:
      return 'Goerli'
    case 42:
      return 'Kovan'
    case 100:
      return 'xDai'
    case 1337:
      return 'Localhost'
    case 31337:
      return 'Hardhat'
    default:
      return chainId.toString()
  }
}
