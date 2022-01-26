import { ChainState, Multicall1ChainState, Multicall2ChainState } from './model'

export interface State<T extends ChainState> {
  [chainId: number]:
    | {
        blockNumber: number
        state?: T
        error?: unknown
      }
    | undefined
}

type Action<T extends ChainState> = FetchSuccess<T> | FetchError

interface FetchSuccess<T extends ChainState> {
  type: 'FETCH_SUCCESS'
  chainId: number
  blockNumber: number
  state: T
}

interface FetchError {
  type: 'FETCH_ERROR'
  chainId: number
  blockNumber: number
  error: unknown
}

export function chainStateReducer<T extends ChainState>(state: State<T> = {}, action: Action<T>) {
  const current = state[action.chainId]?.blockNumber
  if (!current || action.blockNumber >= current) {
    if (action.type === 'FETCH_SUCCESS') {
      let newState = action.state
      if (action.blockNumber === current) {
        // merge with existing state to prevent requests coming out of order
        // from overwriting the data
        const oldState = (state[action.chainId]?.state as T) ?? {}
        for (const [address, entries] of Object.entries(oldState)) {
          newState = {
            ...newState,
            [address]: {
              ...entries,
              ...newState[address],
            },
          }
        }
      }
      return {
        ...state,
        [action.chainId]: { blockNumber: action.blockNumber, state: newState },
      }
    } else if (action.type === 'FETCH_ERROR') {
      return {
        ...state,
        [action.chainId]: { ...state[action.chainId], blockNumber: action.blockNumber, error: action.error },
      }
    }
  }
  return state
}

export function getChainStateReducer<T extends ChainState>() {
  return (state: State<T>, action: Action<T>) => chainStateReducer(state, action)
}

export const multicall1ChainStateReducer = getChainStateReducer<Multicall1ChainState>()
export const multicall2ChainStateReducer = getChainStateReducer<Multicall2ChainState>()
