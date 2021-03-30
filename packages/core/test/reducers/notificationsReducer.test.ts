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
})
