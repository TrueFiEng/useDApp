export type Action = AddCall | RemoveCall

export interface ChainCall {
  address: string
  data: string
}

interface AddCall {
  type: 'ADD_CALLS'
  calls: ChainCall[]
}

interface RemoveCall {
  type: 'REMOVE_CALLS'
  calls: ChainCall[]
}

export function callsReducer(state: ChainCall[] = [], action: Action) {
  if (action.type === 'ADD_CALLS') {
    return [...state, ...action.calls]
  } else {
    let finalState = state
    for (const call of action.calls) {
      const index = finalState.findIndex((x) => x.address === call.address && x.data === call.data)
      if (index !== -1) {
        finalState = finalState.filter((_, i) => i !== index)
      }
    }
    return finalState
  }
}
