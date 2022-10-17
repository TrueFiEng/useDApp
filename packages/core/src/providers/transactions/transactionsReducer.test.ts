import type { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider'
import { expect } from 'chai'
import { StoredTransaction, UpdatedTransaction } from './model'
import { transactionReducer } from './reducer'

describe('transactionsReducer', () => {
  it('addTransaction', () => {
    const transaction: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 10,
    }

    expect(transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction })).to.deep.eq({
      1: [transaction],
    })
  })

  it('updateTransaction', () => {
    const transaction: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 10,
    }

    const state = transactionReducer({}, { type: 'ADD_TRANSACTION', payload: transaction })
    expect(state).to.deep.eq({
      1: [transaction],
    })

    const updatedTransaction: UpdatedTransaction = {
      ...transaction,
      receipt: { status: 1 } as TransactionReceipt,
    }

    expect(transactionReducer(state, { type: 'UPDATE_TRANSACTION', payload: updatedTransaction })).to.deep.eq({
      1: [updatedTransaction],
    })
  })

  it('correct order', () => {
    const initial: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 10,
    }
    const added: StoredTransaction = {
      transaction: { chainId: 1 } as TransactionResponse,
      submittedAt: 30,
    }

    const newState = transactionReducer({ 1: [initial] }, { type: 'ADD_TRANSACTION', payload: added })

    expect(newState).to.deep.eq({ 1: [added, initial] })
  })

  it('update transactions', () => {
    const initialTransactions: StoredTransaction[] = [
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 10 },
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 15 },
      { transaction: { chainId: 1 } as TransactionResponse, submittedAt: 20 },
    ]

    const newTransactions = initialTransactions.map((tx) => ({ ...tx, lastCheckedBlockNumber: 12 }))

    const newState = transactionReducer(
      { 1: initialTransactions },
      { type: 'UPDATE_TRANSACTIONS', chainId: 1, transactions: newTransactions }
    )

    expect(newState).to.deep.eq({ 1: newTransactions })
  })
})
