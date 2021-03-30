import { ChainId } from '../../constants'
import { StoredTransaction, StoredTransactions } from './model'

type Action = TransactionAdded | UpdateTransactions

interface TransactionAdded {
  type: 'ADD_TRANSACTION'
  chainId: ChainId
  hash: string
  from: string
  description: string
  submittedAt: number
}
interface UpdateTransactions {
  type: 'UPDATE_TRANSACTIONS'
  chainId: ChainId
  transactions: StoredTransaction[]
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  const { chainId } = action
  const chainState = state[chainId] ?? []

  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        [chainId]: chainState.concat({
          hash: action.hash,
          description: action.description,
          from: action.from,
          submittedAt: action.submittedAt,
        }),
      }
    case 'UPDATE_TRANSACTIONS':
      return { ...state, [chainId]: [...action.transactions] }
  }
}
