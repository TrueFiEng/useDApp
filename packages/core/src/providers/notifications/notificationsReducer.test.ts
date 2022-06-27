import type { TransactionResponse } from '@ethersproject/abstract-provider'
import { expect } from 'chai'
import { Notification } from './model'
import { notificationReducer } from './reducer'

describe('notificationReducer', () => {
  it('addNotification', () => {
    const notification: Notification = {
      id: '1',
      submittedAt: 12,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }

    expect(notificationReducer({}, { chainId: 1, type: 'ADD_NOTIFICATION', notification })).to.deep.equal({
      1: [notification],
    })
  })

  it('notifications added in correct order', () => {
    const initial: Notification = {
      id: '1',
      submittedAt: 12,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }
    const added: Notification = {
      id: '2',
      submittedAt: 15,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }

    const newState = notificationReducer(
      {
        1: [initial],
      },
      {
        type: 'ADD_NOTIFICATION',
        chainId: 1,
        notification: added,
      }
    )

    expect(newState).to.deep.eq({ 1: [added, initial] })
  })

  it('remove notification', () => {
    const initial: Notification = {
      id: '1',
      submittedAt: 12,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }

    const newState = notificationReducer(
      {
        1: [initial],
      },
      {
        type: 'REMOVE_NOTIFICATION',
        chainId: 1,
        notificationId: '1',
      }
    )

    expect(newState).to.deep.eq({ '1': [] })
  })

  it('remove notification returns correct order', () => {
    const first: Notification = {
      id: '1',
      submittedAt: 12,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }
    const second: Notification = {
      id: '2',
      submittedAt: 13,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }
    const third: Notification = {
      id: '3',
      submittedAt: 14,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }

    const newState = notificationReducer(
      {
        1: [first, second, third],
      },
      {
        type: 'REMOVE_NOTIFICATION',
        chainId: 1,
        notificationId: '2',
      }
    )

    expect(newState).to.deep.eq({ '1': [first, third] })
  })
})
