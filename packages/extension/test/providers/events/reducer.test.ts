import { expect } from 'chai'
import type { Message } from '../../../src/providers/events/Message'
import { reducer, INITIAL_STATE } from '../../../src/providers/events/reducer'
import type { State } from '../../../src/providers/events/State'

describe('reducer', () => {
  const NOW = new Date('July 30, 2015 13:14:15').getTime()
  const SECOND = 1000
  const MINUTE = 60 * SECOND
  const HOUR = 60 * MINUTE

  it('adds the init event', () => {
    const message: Message = {
      source: 'usedapp-hook',
      timestamp: NOW,
      payload: {
        type: 'INIT',
      },
    }
    const expected: State = {
      ...INITIAL_STATE,
      events: [
        {
          type: 'INIT',
          time: '13:14:15',
        },
      ],
    }
    const result = reducer(INITIAL_STATE, message)
    expect(result).to.deep.equal(expected)
  })

  it('correctly formats single digit time', () => {
    const message: Message = {
      source: 'usedapp-hook',
      timestamp: NOW - 10 * HOUR - 10 * MINUTE - 10 * SECOND,
      payload: {
        type: 'INIT',
      },
    }
    const result = reducer(INITIAL_STATE, message)
    expect(result.events[0].time).to.equal('03:04:05')
  })
})
