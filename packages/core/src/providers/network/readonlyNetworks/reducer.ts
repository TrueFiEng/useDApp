import { Actions, NetworkStates } from './model'

export function networkStatesReducer(prevState: NetworkStates, actions: Actions): NetworkStates {
  switch (actions.type) {
    case 'UPDATE_NON_STATIC_CALLS_COUNT': {
      const newState = { ...prevState }
      newState[actions.chainId] = {
        errors: [],
        ...newState[actions.chainId],
        nonStaticCalls: actions.count,
      }
      return newState
    }
    case 'ADD_ERROR': {
      const newState = { ...prevState }
      newState[actions.chainId] = {
        nonStaticCalls: 0,
        ...newState[actions.chainId],
        errors: [...(newState[actions.chainId]?.errors ?? []), actions.error],
      }
      return newState
    }
    default:
      return prevState
  }
}
