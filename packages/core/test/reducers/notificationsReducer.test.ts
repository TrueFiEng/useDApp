import { TransactionResponse } from '@ethersproject/abstract-provider'
import { expect } from 'chai'
import { Notification } from '../../src/providers/notifications/model'
import { notificationReducer } from '../../src/providers/notifications/reducer'

describe('notificationReducer', () => {
  it('addNotification', () => {
    const notification: Notification = {
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
      submittedAt: 12,
      transaction: {} as TransactionResponse,
      type: 'transactionStarted',
    }
    const added: Notification = {
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
})
