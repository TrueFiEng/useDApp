import _isNumber from 'lodash/isNumber'

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

function isChainId(chainId: number): chainId is number {
  return _isNumber(chainId)
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
