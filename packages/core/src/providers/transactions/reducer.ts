import { TransactionReceipt } from '@ethersproject/providers'
import { ChainId } from '../../constants'
import { StoredTransactions } from './model'

type Action = TransactionAdded | TransactionChecked | TransactionMined

interface TransactionAdded {
  type: 'TRANSACTION_ADDED'
  chainId: ChainId
  hash: string
  from: string
  description: string
  submittedAt: number
}

interface TransactionChecked {
  type: 'TRANSACTION_CHECKED'
  chainId: ChainId
  hash: string
  blockNumber: number
}

interface TransactionMined {
  type: 'TRANSACTION_MINED'
  chainId: ChainId
  hash: string
  receipt: TransactionReceipt
}

export function transactionReducer(state: StoredTransactions, action: Action): StoredTransactions {
  const chainState = state[action.chainId] ?? []
  const { chainId } = action

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
    case 'TRANSACTION_CHECKED':
      return {
        ...state,
        [chainId]: chainState.map((tx) => {
          if (tx.hash === action.hash) {
            return { ...tx, lastCheckedBlockNumber: action.blockNumber }
          } else {
            return tx
          }
        }),
      }
    case 'TRANSACTION_MINED':
      return {
        ...state,
        [chainId]: chainState.map((tx) => {
          if (tx.hash === action.hash) {
            return { ...tx, receipt: action.receipt }
          } else {
            return tx
          }
        }),
      }
  }
}
