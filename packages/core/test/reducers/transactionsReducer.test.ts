import { TransactionResponse } from '@ethersproject/abstract-provider'
import { expect } from 'chai'
import { StoredTransaction } from '../../src'
import { transactionReducer } from '../../src/providers/transactions/reducer'

describe('transactionsReducer', () => {
  it('addTransaction', () => {
    const transaction: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 10,
      status: 'transactionMining',
    }

    expect(transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction })).to.deep.eq({
      1: [transaction],
    })
  })

  it('correct order', () => {
    const initial: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 10,
      status: 'transactionMining',
    }
    const added: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 30,
      status: 'transactionMining',
    }

    const newState = transactionReducer({ 1: [initial] }, { type: 'ADD_TRANSACTION', payload: added })

    expect(newState).to.deep.eq({ 1: [added, initial] })
  })

  it('update transactions', () => {
    const initialTransactions: StoredTransaction[] = [
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 10, status: 'transactionMining' },
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 15, status: 'transactionMining' },
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 20, status: 'transactionMining' },
    ]

    const newTransactions = initialTransactions.map((tx) => ({ ...tx, lastCheckedBlockNumber: 12 }))

    const newState = transactionReducer(
      { 1: initialTransactions },
      { type: 'UPDATE_TRANSACTIONS', chainId: 1, transactions: newTransactions }
    )

    expect(newState).to.deep.eq({ 1: newTransactions })
  })
})
