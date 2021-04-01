import { ChainId } from '../../constants'
import { StoredTransaction, StoredTransactions } from './model'

type Action = AddTransaction | UpdateTransactions

interface AddTransaction {
  type: 'ADD_TRANSACTION'
  transaction: StoredTransaction
  chainId: ChainId
}
interface UpdateTransactions {
  type: 'UPDATE_TRANSACTIONS'
  chainId: ChainId
  transactions: StoredTransaction[]
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        [action.chainId]: (state[action.chainId] ?? []).concat(action.transaction),
      }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [action.chainId]: [...action.transactions] }
  }
}
