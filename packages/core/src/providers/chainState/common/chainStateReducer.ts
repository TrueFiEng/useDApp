import { ChainState } from './model'

export interface State {
  [chainId: number]:
    | {
        blockNumber: number
        state?: ChainState
        error?: unknown
      }
    | undefined
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export type ChainStateAction = FetchSuccess | FetchError

interface FetchSuccess {
  type: 'FETCH_SUCCESS'
  chainId: number
  blockNumber: number
  state: ChainState
}

interface FetchError {
  type: 'FETCH_ERROR'
  chainId: number
  blockNumber: number
  error: unknown
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function chainStateReducer(state: State = {}, action: ChainStateAction) {
  const current = state[action.chainId]?.blockNumber
  if (!current || action.blockNumber >= current) {
    if (action.type === 'FETCH_SUCCESS') {
      let newState = action.state
      // merge with existing state
      const oldState = state[action.chainId]?.state ?? {}
      for (const [address, entries] of Object.entries(oldState)) {
        newState = {
          ...newState,
          [address]: {
            ...entries,
            ...newState[address],
          },
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
