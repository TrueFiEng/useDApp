import { ChainId } from '../../../constants'
import { Actions, NetworkStates } from './model'

export function networkStatesReducer(prevState: NetworkStates, actions: Actions): NetworkStates {
  switch (actions.type) {
    case 'UPDATE_NON_STATIC_CALLS_COUNT': {
      const newState = { ...prevState }
      for (const key in actions.count) {
        const chainId = (key as unknown) as ChainId
        newState[chainId] = {
          ...newState[chainId],
          nonStaticCalls: actions.count[chainId],
        }
      }
      return newState
    }
    default:
      return prevState
  }
}
