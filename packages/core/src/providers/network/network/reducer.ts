import { Actions, Network } from './model'

export const defaultNetworkState = {
  provider: undefined,
  chainId: undefined,
  accounts: [],
  errors: [],
}

export function networkReducer(prevState: Network, actions: Actions): Network {
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
