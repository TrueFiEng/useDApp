import { ChainId } from '../../constants'
import { StoredTransaction, StoredTransactions } from './model'

type Action = TransactionAdded | UpdateTransactions

interface TransactionAdded {
  type: 'TRANSACTION_ADDED'
  chainId: ChainId
  hash: string
  from: string
  description: string
  submittedAt: number
}
interface UpdateTransactions {
  type: 'TRANSACTIONS_UPDATE'
  chainId: ChainId
  transactions: StoredTransaction[]
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  const { chainId } = action
  const chainState = state[chainId] ?? []

  switch (action.type) {
    case 'TRANSACTION_ADDED':
      return {
        ...state,
        [chainId]: chainState.concat({
          hash: action.hash,
          description: action.description,
          from: action.from,
          submittedAt: action.submittedAt,
        }),
      }
    case 'TRANSACTIONS_UPDATE':
      return { ...state, [chainId]: [...action.transactions] }
  }
}
