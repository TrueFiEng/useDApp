import { ChainId } from '../../constants'
import { StoredTransaction, StoredTransactions, TransactionWithChainId } from './model'

type Action = AddTransaction | UpdateTransactions

interface AddTransaction {
  type: 'ADD_TRANSACTION'
  transaction: TransactionWithChainId
  submittedAt: number
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
        [action.transaction.chainId]: (state[action.transaction.chainId] ?? []).concat({
          transaction: action.transaction,
          submittedAt: action.submittedAt,
        }),
      }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [action.chainId]: [...action.transactions] }
  }
}
