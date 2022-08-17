interface BlockNumberState {
  [chainId: number]: number | undefined
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export interface BlockNumberChanged {
  chainId: number
  blockNumber: number
}

/**
 * @internal Intended for internal use - use it on your own risk
 */
export function blockNumberReducer(state: BlockNumberState = {}, action: BlockNumberChanged) {
  const current = state[action.chainId]
  if (!current || action.blockNumber > current) {
    return {
      ...state,
      [action.chainId]: action.blockNumber,
    }
  }
  return state
}
