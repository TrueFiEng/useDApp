interface BlockNumberState {
  [chainId: number]: number | undefined
}

interface BlockNumberChanged {
  chainId: number
  blockNumber: number
}

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
