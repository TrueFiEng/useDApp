import { Actions, Network } from './model'

export function networksReducer(prevState: Network, actions: Actions): Network {
  switch (actions.type) {
    case 'UPDATE_NETWORK':
      return {
        ...prevState,
        provider: actions.provider,
        chainId: actions.chainId,
        accounts: actions.accounts,
      }
    default:
      return prevState
  }
}
