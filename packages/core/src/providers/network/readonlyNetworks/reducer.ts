import { Actions, NetworkStates } from './model'

export function networkStatesReducer(prevState: NetworkStates, actions: Actions): NetworkStates {
  switch (actions.type) {
    case 'UPDATE_NON_STATIC_CALLS_COUNT': {
      const newState = { ...prevState }
      newState[actions.chainId] = {
        ...newState[actions.chainId],
        nonStaticCalls: actions.count,
      }
      return newState
    }
    default:
      return prevState
  }
}
