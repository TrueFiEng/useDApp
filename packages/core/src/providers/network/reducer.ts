import { Actions, Networks } from './model'

export const defaultNetworkState = {
  networks: {},
  errors: [],
}

export function networksReducer(prevState: Networks, actions: Actions): Networks {
  switch (actions.type) {
    case 'CHANGE_CHAIN_ID':
      return {
        ...prevState,
        networks: {
          ...prevState.networks,
          [actions.newChainId]: Object.assign(prevState.networks[actions.oldChainId], {}),
          [actions.oldChainId]: undefined,
        },
      }
    case 'UPDATE_NETWORK':
      return {
        ...prevState,
        networks: {
          ...prevState.networks,
          [actions.chainId]: {
            ...prevState.networks[actions.chainId],
            ...actions.network,
          },
        },
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
