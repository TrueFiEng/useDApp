import { ChainId } from '../../..'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export type Action = AddCall | RemoveCall | UpdateCall

/**
 * @public
 */
export interface RawCall {
  chainId: ChainId
  address: string
  data: string
  isStatic?: boolean
  isDisabled?: boolean
  lastUpdatedBlockNumber?: number
  refreshPerBlocks?: number
}

/**
 * @deprecated It's recommended to use RawCall instead
 * @internal Intended for internal use - use it on your own risk
 */
export interface ChainCall {
  chainId?: ChainId
  address: string
  data: string
}

interface AddCall {
  type: 'ADD_CALLS'
  calls: RawCall[]
}

interface UpdateCall {
  type: 'UPDATE_CALLS'
  calls: RawCall[]
  blockNumber: number
  chainId: number
}

interface RemoveCall {
  type: 'REMOVE_CALLS'
  calls: RawCall[]
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function callsReducer(state: RawCall[] = [], action: Action) {
  if (action.type === 'ADD_CALLS') {
    return [...state, ...action.calls.map((call) => ({ ...call, address: call.address.toLowerCase() }))]
  } else if (action.type === 'UPDATE_CALLS') {
    return state.map((call) => {
      if (call.chainId !== action.chainId) {
        return call
      }
      const blockNumber = action.blockNumber
      if (call.refreshPerBlocks && call.lastUpdatedBlockNumber) {
        return call.lastUpdatedBlockNumber + call.refreshPerBlocks <= blockNumber
          ? {
              ...call,
              lastUpdatedBlockNumber: blockNumber,
              isDisabled: false,
            }
          : {
              ...call,
              isDisabled: true,
            }
      }

      return call.isStatic
        ? {
            ...call,
            isDisabled: true,
          }
        : {
            ...call,
            lastUpdatedBlockNumber: blockNumber,
            isDisabled: call.refreshPerBlocks !== undefined ? true : false,
          }
    })
  } else {
    let finalState = state
    for (const call of action.calls) {
      const index = finalState.findIndex(
        (x) => x.address.toLowerCase() === call.address.toLowerCase() && x.data === call.data
      )
      if (index !== -1) {
        finalState = finalState.filter((_, i) => i !== index)
      }
    }
    return finalState
  }
}
