import { ChainId } from '../../..'

/**
 * @internal Intended for internal use - use it on your own risk
 */
export type Action = AddCall | RemoveCall

/**
 * @public
 */
export interface RawCall {
  chainId: ChainId
  address: string
  data: string
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

interface RemoveCall {
  type: 'REMOVE_CALLS'
  calls: RawCall[]
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function callsReducer(state: RawCall[] = [], action: Action) {
  if (action.type === 'ADD_CALLS') {
    return [...state, ...action.calls]
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
