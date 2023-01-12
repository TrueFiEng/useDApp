import { Actions, NetworkStates } from './model'

export function networkStatesReducer(prevState: NetworkStates, actions: Actions): NetworkStates {
  switch (actions.type) {
    case 'ADD_ERROR': {
      const newState = { ...prevState }
      newState[actions.chainId] = {
        ...newState[actions.chainId],
        errors: [...(newState[actions.chainId]?.errors ?? []), actions.error],
      }
      return newState
    }
    default:
      return prevState
  }
}
