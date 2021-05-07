import { expect } from 'chai'
import type { ChainCall, Message, MulticallErrorPayload } from '../../../src/providers/events/Message'
import { reducer, INITIAL_STATE } from '../../../src/providers/events/reducer'
import type { Event, FetchErrorEvent, State } from '../../../src/providers/events/State'

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
      const result = stateAfter(makeInitMessage('03:04:05'))
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

  describe('block number changed', () => {
    it('adds a block found event', () => {
      const result = stateAfter(makeBlockNumberChangedMessage('13:14:15', 1, 123456))
      const expected: State = {
        ...INITIAL_STATE,
        blockNumbers: {
          Mainnet: 123456,
        },
        events: [makeBlockFoundEvent('13:14:15', 'Mainnet', 123456)],
      }
      expect(result).to.deep.equal(expected)
    })

    it('overwrites the block number', () => {
      const result = stateAfter(
        makeBlockNumberChangedMessage('13:14:15', 1, 123456),
        makeBlockNumberChangedMessage('13:14:16', 1, 123458)
      )
      const expected: State = {
        ...INITIAL_STATE,
        blockNumbers: {
          Mainnet: 123458,
        },
        events: [
          makeBlockFoundEvent('13:14:15', 'Mainnet', 123456),
          makeBlockFoundEvent('13:14:16', 'Mainnet', 123458),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('tracks block numbers for many chains', () => {
      const result = stateAfter(
        makeBlockNumberChangedMessage('13:14:15', 1, 123456),
        makeBlockNumberChangedMessage('13:14:16', 42, 4567)
      )
      const expected: State = {
        ...INITIAL_STATE,
        blockNumbers: {
          Mainnet: 123456,
          Kovan: 4567,
        },
        events: [makeBlockFoundEvent('13:14:15', 'Mainnet', 123456), makeBlockFoundEvent('13:14:16', 'Kovan', 4567)],
      }
      expect(result).to.deep.equal(expected)
    })
  })

  describe('calls changed', () => {
    const CALL_A = {
      address: `0x` + 'a'.repeat(40),
      data: '0xdeadbeef',
    }
    const CALL_B = {
      address: `0x` + 'b'.repeat(40),
      data: '0xdeadbeef',
    }
    const CALL_C = {
      address: `0x` + 'a'.repeat(40),
      data: '0x1337b00b1e569420',
    }

    it('can track calls added', () => {
      const result = stateAfter(makeCallsChangedMessage('13:14:15', 1, [CALL_A, CALL_B]))
      const expected: State = {
        ...INITIAL_STATE,
        calls: [CALL_A, CALL_B],
        events: [
          makeCallsUpdatedEvent('13:14:15', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('can track calls removed', () => {
      const result = stateAfter(
        makeCallsChangedMessage('13:14:15', 1, [CALL_A, CALL_B]),
        makeCallsChangedMessage('13:14:16', 1, [])
      )
      const expected: State = {
        ...INITIAL_STATE,
        events: [
          makeCallsUpdatedEvent('13:14:15', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
          makeCallsUpdatedEvent('13:14:16', 'Mainnet', {
            removed: [CALL_A, CALL_B],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('can track added, removed and persisted', () => {
      const result = stateAfter(
        makeCallsChangedMessage('13:14:15', 1, [CALL_A, CALL_B]),
        makeCallsChangedMessage('13:14:16', 1, [CALL_A, CALL_C])
      )
      const expected: State = {
        ...INITIAL_STATE,
        calls: [CALL_A, CALL_C],
        events: [
          makeCallsUpdatedEvent('13:14:15', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
          makeCallsUpdatedEvent('13:14:16', 'Mainnet', {
            added: [CALL_C],
            removed: [CALL_B],
            persisted: [CALL_A],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })
  })

  describe('multicall error', () => {
    const CALL_A = {
      address: `0x` + 'a'.repeat(40),
      data: '0xdeadbeef',
    }
    const CALL_B = {
      address: `0x` + 'b'.repeat(40),
      data: '0xdeadbeef',
    }
    const MULTICALL = '0x' + 'c'.repeat(40)

    it('is simply added to the event list', () => {
      const result = stateAfter(
        makeMulticallErrorMessage('13:14:15', {
          blockNumber: 1234,
          calls: [CALL_A, CALL_B],
          chainId: 1,
          duration: 400,
          error: 'Something went wrong',
          multicallAddress: MULTICALL,
        })
      )
      const expected: State = {
        ...INITIAL_STATE,
        events: [
          makeFetchErrorEvent('13:14:15', {
            blockNumber: 1234,
            calls: [CALL_A, CALL_B],
            network: 'Mainnet',
            duration: 400,
            error: 'Something went wrong',
            multicallAddress: MULTICALL,
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('preserves existing events', () => {
      const result = stateAfter(
        makeBlockNumberChangedMessage('13:14:00', 1, 1234),
        makeMulticallErrorMessage('13:14:15', {
          blockNumber: 1234,
          calls: [CALL_A, CALL_B],
          chainId: 1,
          duration: 400,
          error: 'Something went wrong',
          multicallAddress: MULTICALL,
        })
      )
      expect(result.events.length).to.equal(2)
    })
  })
})

function stateAfter(...messages: Message[]) {
  // we clone messages to ensure referential equality cannot be used on objects
  return messages.map((x) => JSON.parse(JSON.stringify(x)) as Message).reduce(reducer, INITIAL_STATE)
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

function makeBlockNumberChangedMessage(time: string, chainId: number, blockNumber: number): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: { type: 'BLOCK_NUMBER_CHANGED', chainId, blockNumber },
  }
}

function makeCallsChangedMessage(time: string, chainId: number, calls: ChainCall[]): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: { type: 'CALLS_CHANGED', chainId, calls },
  }
}

function makeMulticallErrorMessage(time: string, options: Omit<MulticallErrorPayload, 'type'>): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: {
      type: 'MULTICALL_ERROR',
      ...options,
    },
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

function makeBlockFoundEvent(time: string, network: string, blockNumber: number): Event {
  return { type: 'BLOCK_FOUND', time, network, blockNumber }
}

function makeCallsUpdatedEvent(
  time: string,
  network: string,
  calls: { added?: ChainCall[]; removed?: ChainCall[]; persisted?: ChainCall[] }
): Event {
  return { type: 'CALLS_UPDATED', time, network, added: [], removed: [], persisted: [], ...calls }
}

function makeFetchErrorEvent(time: string, options: Omit<FetchErrorEvent, 'type' | 'time'>): Event {
  return {
    type: 'FETCH_ERROR',
    time,
    ...options,
  }
}
