import { ChainId } from '../../constants'
import { StoredTransaction, StoredTransactions } from './model'

type Action = AddTransaction | UpdateTransactions

interface AddTransaction {
  type: 'ADD_TRANSACTION'
  payload: StoredTransaction
}
interface UpdateTransactions {
  type: 'UPDATE_TRANSACTIONS'
  chainId: ChainId
  transactions: StoredTransaction[]
}

function isChainId(chainId: number): chainId is ChainId {
  return Object.values(ChainId).includes(chainId)
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const { chainId } = action.payload.transaction

      if (isChainId(chainId)) {
        return {
          ...state,
          [chainId]: [action.payload, ...(state[chainId] ?? [])],
        }
      } else {
        throw TypeError('Unsupported chain')
      }
    }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [action.chainId]: [...action.transactions] }
  }
}
