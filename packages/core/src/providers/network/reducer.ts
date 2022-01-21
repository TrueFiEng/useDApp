import { Actions, Network } from './model'

export function networksReducer(prevState: Network, actions: Actions): Network {
  switch (actions.type) {
    case 'UPDATE_NETWORK':
      return {
        ...prevState,
        ...actions.network,
      }
    case 'ADD_ERROR':
      return {
        ...prevState,
        errors: [...prevState.errors, actions.error],
      }
    default:
      return prevState
  }
}
