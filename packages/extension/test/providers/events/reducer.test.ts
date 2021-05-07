import { expect } from 'chai'
import type { Message } from '../../../src/providers/events/Message'
import { reducer, INITIAL_STATE } from '../../../src/providers/events/reducer'
import type { Event, State } from '../../../src/providers/events/State'

describe('reducer', () => {
  describe('init', () => {
    it('adds the init event', () => {
      const result = stateAfter(makeInitMessage('13:14:15'))
      const expected: State = {
        ...INITIAL_STATE,
        events: [makeInitEvent('13:14:15')],
      }
      expect(result).to.deep.equal(expected)
    })

    it('correctly formats single digit time', () => {
      const message = makeInitMessage('03:04:05')
      const result = reducer(INITIAL_STATE, message)
      expect(result.events[0].time).to.equal('03:04:05')
    })

    it('resets the state', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('01:00:01', 1),
        makeNetworkChangedMessage('01:00:02', 2),
        makeInitMessage('13:14:15')
      )
      const expected = stateAfter(makeInitMessage('13:14:15'))
      expect(result).to.deep.equal(expected)
    })
  })

  describe('network changed', () => {
    it('adds a network connected event', () => {
      const result = stateAfter(makeNetworkChangedMessage('13:14:15', 1))
      const expected: State = {
        ...INITIAL_STATE,
        currentNetwork: 'Mainnet',
        events: [makeNetworkConnectedEvent('13:14:15', 1, 'Mainnet')],
      }
      expect(result).to.deep.equal(expected)
    })

    it('adds a network disconnected event', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('13:14:15', 1),
        makeNetworkChangedMessage('13:14:16', undefined)
      )
      const expected: State = {
        ...INITIAL_STATE,
        events: [makeNetworkConnectedEvent('13:14:15', 1, 'Mainnet'), makeNetworkDisconnectedEvent('13:14:16')],
      }
      expect(result).to.deep.equal(expected)
    })

    it('does nothing if connected to the same network', () => {
      const result = stateAfter(makeNetworkChangedMessage('13:14:15', 1), makeNetworkChangedMessage('13:14:16', 1))
      const expected = stateAfter(makeNetworkChangedMessage('13:14:15', 1))
      expect(result).to.deep.equal(expected)
    })

    it('is disconnected by default', () => {
      const result = stateAfter(makeNetworkChangedMessage('13:14:15', undefined))
      expect(result).to.deep.equal(INITIAL_STATE)
    })

    it('does nothing if disconnected again', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('13:14:15', 1),
        makeNetworkChangedMessage('13:14:16', undefined),
        makeNetworkChangedMessage('13:14:17', undefined)
      )
      const expected = stateAfter(
        makeNetworkChangedMessage('13:14:15', 1),
        makeNetworkChangedMessage('13:14:16', undefined)
      )
      expect(result).to.deep.equal(expected)
    })

    it('preserves past events when connected', () => {
      const result = stateAfter(makeNetworkChangedMessage('13:14:15', 1), makeNetworkChangedMessage('13:14:16', 2))
      expect(result.events.length).to.equal(2)
    })

    it('preserves past events when disconnected', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('13:14:15', 1),
        makeNetworkChangedMessage('13:14:16', undefined)
      )
      expect(result.events.length).to.equal(2)
    })
  })
})

function stateAfter(...messages: Message[]) {
  return messages.reduce(reducer, INITIAL_STATE)
}

function toTimestamp(time: string) {
  return new Date(`July 30, 2015 ${time}`).getTime()
}

// messages

function makeInitMessage(time: string): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: { type: 'INIT' },
  }
}

function makeNetworkChangedMessage(time: string, chainId: number | undefined): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: { type: 'NETWORK_CHANGED', chainId },
  }
}

// events

function makeInitEvent(time: string): Event {
  return { type: 'INIT', time }
}

function makeNetworkConnectedEvent(time: string, chainId: number, network: string): Event {
  return { type: 'NETWORK_CONNECTED', time, network, chainId }
}

function makeNetworkDisconnectedEvent(time: string): Event {
  return { type: 'NETWORK_DISCONNECTED', time }
}
