import { StoredTransaction, StoredTransactions, UpdatedTransaction } from './model'

type Action = AddTransaction | UpdateTransaction | UpdateTransactions

interface AddTransaction {
  type: 'ADD_TRANSACTION'
  payload: StoredTransaction
}
interface UpdateTransaction {
  type: 'UPDATE_TRANSACTION'
  payload: UpdatedTransaction
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
    case 'UPDATE_TRANSACTION': {
      const { chainId, hash } = action.payload.transaction
      return {
        ...state,
        [chainId]: (state[chainId] ?? []).map((tx) =>
          tx.transaction.hash === hash ? { ...tx, ...action.payload } : tx
        ),
      }
    }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [action.chainId]: [...action.transactions] }
  }
}
