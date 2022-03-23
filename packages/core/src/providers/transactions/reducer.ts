import { StoredTransaction, StoredTransactions } from './model'

type Action = AddTransaction | UpdateTransactions

interface AddTransaction {
  type: 'ADD_TRANSACTION'
  payload: StoredTransaction
}
interface UpdateTransactions {
  type: 'UPDATE_TRANSACTIONS'
  chainId: number
  transactions: StoredTransaction[]
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      const { chainId } = action.payload.transaction
      return {
        ...state,
        [chainId]: [action.payload, ...(state[chainId] ?? [])],
      }
    }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [action.chainId]: [...action.transactions] }
  }
}
