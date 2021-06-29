import { expect } from 'chai'
import type {
  ChainCall,
  HookMessage,
  InitPayload,
  Message,
  MulticallErrorPayload,
  MulticallSuccessPayload,
} from '../../../src/providers/events/Message'
import { reducer, INITIAL_STATE } from '../../../src/providers/events/reducer'
import type { Event, FetchErrorEvent, State, StateUpdatedEvent } from '../../../src/providers/events/State'

const STATE_WITH_INIT = reducer(INITIAL_STATE, makeInitMessage('12:00:00.000'))
const INIT_EVENT = STATE_WITH_INIT.events[0]

describe('reducer', () => {
  describe('init', () => {
    it('adds the init event', () => {
      const message = makeInitMessage('13:14:15.167')
      const result = reducer(INITIAL_STATE, message)
      const expected: State = {
        ...INITIAL_STATE,
        initTimestamp: message.timestamp,
        events: [makeInitEvent('13:14:15.167')],
      }
      expect(result).to.deep.equal(expected)
    })

    it('correctly formats single digit time', () => {
      const result = stateAfter(makeInitMessage('03:04:05.067'))
      expect(result.events[0].time).to.equal('03:04:05.067')
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
      const result = stateAfter(makeNetworkChangedMessage('12:00:00.123', 1))
      const expected: State = {
        ...STATE_WITH_INIT,
        currentNetwork: 'Mainnet',
        events: [INIT_EVENT, makeNetworkConnectedEvent('+00:00.123', 1, 'Mainnet')],
      }
      expect(result).to.deep.equal(expected)
    })

    it('adds a network disconnected event', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('12:00:00.123', 1),
        makeNetworkChangedMessage('12:14:15.456', undefined)
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [
          INIT_EVENT,
          makeNetworkConnectedEvent('+00:00.123', 1, 'Mainnet'),
          makeNetworkDisconnectedEvent('+14:15.456'),
        ],
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
      expect(result).to.deep.equal(STATE_WITH_INIT)
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
      expect(result.events.length).to.equal(3)
    })

    it('preserves past events when disconnected', () => {
      const result = stateAfter(
        makeNetworkChangedMessage('13:14:15', 1),
        makeNetworkChangedMessage('13:14:16', undefined)
      )
      expect(result.events.length).to.equal(3)
    })
  })

  describe('block number changed', () => {
    it('adds a block found event', () => {
      const result = stateAfter(makeBlockNumberChangedMessage('12:00:00.123', 1, 123456))
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [INIT_EVENT, makeBlockFoundEvent('+00:00.123', 'Mainnet', 123456)],
      }
      expect(result).to.deep.equal(expected)
    })

    it('preserves past events', () => {
      const result = stateAfter(
        makeBlockNumberChangedMessage('13:14:15', 1, 123456),
        makeBlockNumberChangedMessage('13:14:16', 1, 123458)
      )
      expect(result.events.length).to.equal(3)
    })
  })

  describe('account changed', () => {
    const ACCOUNT = '0x' + 'a'.repeat(40)
    const OTHER_ACCOUNT = '0x' + 'b'.repeat(40)

    it('adds a network connected event', () => {
      const result = stateAfter(makeAccountChangedMessage('12:00:00.123', ACCOUNT))
      const expected: State = {
        ...STATE_WITH_INIT,
        account: ACCOUNT,
        events: [INIT_EVENT, makeAccountConnectedEvent('+00:00.123', ACCOUNT)],
      }
      expect(result).to.deep.equal(expected)
    })

    it('adds a network disconnected event', () => {
      const result = stateAfter(
        makeAccountChangedMessage('12:00:00.123', ACCOUNT),
        makeAccountChangedMessage('12:14:15.456', undefined)
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [
          INIT_EVENT,
          makeAccountConnectedEvent('+00:00.123', ACCOUNT),
          makeAccountDisconnectedEvent('+14:15.456'),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('does nothing if connected to the same network', () => {
      const result = stateAfter(
        makeAccountChangedMessage('13:14:15', ACCOUNT),
        makeAccountChangedMessage('13:14:16', ACCOUNT)
      )
      const expected = stateAfter(makeAccountChangedMessage('13:14:15', ACCOUNT))
      expect(result).to.deep.equal(expected)
    })

    it('is disconnected by default', () => {
      const result = stateAfter(makeAccountChangedMessage('13:14:15', undefined))
      expect(result).to.deep.equal(STATE_WITH_INIT)
    })

    it('does nothing if disconnected again', () => {
      const result = stateAfter(
        makeAccountChangedMessage('13:14:15', ACCOUNT),
        makeAccountChangedMessage('13:14:16', undefined),
        makeAccountChangedMessage('13:14:17', undefined)
      )
      const expected = stateAfter(
        makeAccountChangedMessage('13:14:15', ACCOUNT),
        makeAccountChangedMessage('13:14:16', undefined)
      )
      expect(result).to.deep.equal(expected)
    })

    it('preserves past events when connected', () => {
      const result = stateAfter(
        makeAccountChangedMessage('13:14:15', ACCOUNT),
        makeAccountChangedMessage('13:14:16', OTHER_ACCOUNT)
      )
      expect(result.events.length).to.equal(3)
    })

    it('preserves past events when disconnected', () => {
      const result = stateAfter(
        makeAccountChangedMessage('13:14:15', ACCOUNT),
        makeAccountChangedMessage('13:14:16', undefined)
      )
      expect(result.events.length).to.equal(3)
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
      const result = stateAfter(makeCallsChangedMessage('12:00:00.123', 1, [CALL_A, CALL_B]))
      const expected: State = {
        ...STATE_WITH_INIT,
        calls: [CALL_A, CALL_B],
        events: [
          INIT_EVENT,
          makeCallsUpdatedEvent('+00:00.123', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('can track calls removed', () => {
      const result = stateAfter(
        makeCallsChangedMessage('12:00:00.123', 1, [CALL_A, CALL_B]),
        makeCallsChangedMessage('12:14:15.456', 1, [])
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [
          INIT_EVENT,
          makeCallsUpdatedEvent('+00:00.123', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
          makeCallsUpdatedEvent('+14:15.456', 'Mainnet', {
            removed: [CALL_A, CALL_B],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('can track added, removed and persisted', () => {
      const result = stateAfter(
        makeCallsChangedMessage('12:00:00.123', 1, [CALL_A, CALL_B]),
        makeCallsChangedMessage('12:14:15.456', 1, [CALL_A, CALL_C])
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        calls: [CALL_A, CALL_C],
        events: [
          INIT_EVENT,
          makeCallsUpdatedEvent('+00:00.123', 'Mainnet', {
            added: [CALL_A, CALL_B],
          }),
          makeCallsUpdatedEvent('+14:15.456', 'Mainnet', {
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
        makeMulticallErrorMessage('12:00:00.123', {
          blockNumber: 1234,
          calls: [CALL_A, CALL_B],
          chainId: 1,
          duration: 400,
          error: 'Something went wrong',
          multicallAddress: MULTICALL,
        })
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [
          INIT_EVENT,
          makeFetchErrorEvent('+00:00.123', {
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
      expect(result.events.length).to.equal(3)
    })
  })

  describe('multicall success', () => {
    const ADDRESS_A = '0x' + 'a'.repeat(40)
    const ADDRESS_B = '0x' + 'b'.repeat(40)
    const ADDRESS_C = '0x' + 'c'.repeat(40)
    const MULTICALL = '0x' + '1'.repeat(40)

    const entry = (address: string, data: string, value: string) => ({ address, data, value })
    const diff = (address: string, data: string, previous?: string, current?: string) => ({
      address,
      data,
      previous,
      current,
    })

    it('sets the state and block number', () => {
      const result = stateAfter(
        makeMulticallSuccessMessage('12:00:00.123', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {
            [ADDRESS_A]: {
              '0xdead': '0xbeef',
            },
          },
        })
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        blockNumbers: {
          Mainnet: 1234,
        },
        state: {
          Mainnet: [entry(ADDRESS_A, '0xdead', '0xbeef')],
        },
        events: [
          INIT_EVENT,
          makeStateUpdatedEvent('+00:00.123', {
            blockNumber: 1234,
            duration: 400,
            multicallAddress: MULTICALL,
            network: 'Mainnet',
            persisted: [],
            updated: [diff(ADDRESS_A, '0xdead', undefined, '0xbeef')],
          }),
        ],
      }
      expect(result).to.deep.equal(expected)
    })

    it('can track block numbers for different chains', () => {
      const result = stateAfter(
        makeMulticallSuccessMessage('13:14:15', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {},
        }),
        makeMulticallSuccessMessage('13:14:16', {
          blockNumber: 567,
          chainId: 42,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {},
        })
      )
      const blockNumbers = {
        Mainnet: 1234,
        Kovan: 567,
      }
      expect(result.blockNumbers).to.deep.equal(blockNumbers)
    })

    it('ignores stale updates', () => {
      const result = stateAfter(
        makeMulticallSuccessMessage('13:14:15', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {},
        }),
        makeMulticallSuccessMessage('13:14:16', {
          blockNumber: 1233,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {},
        })
      )
      const expected = stateAfter(
        makeMulticallSuccessMessage('13:14:15', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {},
        })
      )
      expect(result).to.deep.equal(expected)
    })

    it('figures out the state difference', () => {
      const result = stateAfter(
        makeMulticallSuccessMessage('12:00:00.123', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {
            [ADDRESS_A]: {
              '0xdead': '0xbeef',
              '0x1f00': '0x2b00',
            },
            [ADDRESS_B]: {
              '0xcc': '0xdd',
            },
            [ADDRESS_C]: {
              '0x1234': '0x5678',
            },
          },
        }),
        makeMulticallSuccessMessage('12:14:15.456', {
          blockNumber: 1235,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {
            [ADDRESS_A]: {
              '0xdead': '0xf00d',
              '0x12aa': '0x34bb',
            },
            [ADDRESS_B]: {
              '0xcc': '0xdd',
            },
          },
        })
      )
      const expectedEntries = [
        {
          address: ADDRESS_A,
          data: '0xdead',
          value: '0xf00d',
        },
        {
          address: ADDRESS_A,
          data: '0x12aa',
          value: '0x34bb',
        },
        {
          address: ADDRESS_B,
          data: '0xcc',
          value: '0xdd',
        },
      ]
      const expected = makeStateUpdatedEvent('+14:15.456', {
        blockNumber: 1235,
        network: 'Mainnet',
        duration: 400,
        multicallAddress: MULTICALL,
        updated: [
          {
            address: ADDRESS_A,
            data: '0xdead',
            previous: '0xbeef',
            current: '0xf00d',
          },
          {
            address: ADDRESS_A,
            data: '0x1f00',
            previous: '0x2b00',
            current: undefined,
          },
          {
            address: ADDRESS_C,
            data: '0x1234',
            previous: '0x5678',
            current: undefined,
          },
          {
            address: ADDRESS_A,
            data: '0x12aa',
            previous: undefined,
            current: '0x34bb',
          },
        ],
        persisted: [
          {
            address: ADDRESS_B,
            data: '0xcc',
            value: '0xdd',
          },
        ],
      })
      expect(result.state.Mainnet).to.deep.equal(expectedEntries)
      expect(result.events[2]).to.deep.equal(expected)
    })

    it('merges state for same block', () => {
      const result = stateAfter(
        makeMulticallSuccessMessage('12:00:00.123', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {
            [ADDRESS_A]: {
              '0xdead': '0xbeef',
              '0x1f00': '0x2b00',
            },
            [ADDRESS_B]: {
              '0xcc': '0xdd',
            },
            [ADDRESS_C]: {
              '0x1234': '0x5678',
            },
          },
        }),
        makeMulticallSuccessMessage('12:14:15.456', {
          blockNumber: 1234,
          chainId: 1,
          duration: 400,
          multicallAddress: MULTICALL,
          state: {
            [ADDRESS_A]: {
              '0xdead': '0xf00d',
              '0x12aa': '0x34bb',
            },
            [ADDRESS_B]: {
              '0xcc': '0xdd',
            },
          },
        })
      )
      const expectedEntries = [
        {
          address: ADDRESS_A,
          data: '0xdead',
          value: '0xf00d',
        },
        {
          address: ADDRESS_A,
          data: '0x12aa',
          value: '0x34bb',
        },
        {
          address: ADDRESS_A,
          data: '0x1f00',
          value: '0x2b00',
        },
        {
          address: ADDRESS_B,
          data: '0xcc',
          value: '0xdd',
        },
        {
          address: ADDRESS_C,
          data: '0x1234',
          value: '0x5678',
        },
      ]
      const expected = makeStateUpdatedEvent('+14:15.456', {
        blockNumber: 1234,
        network: 'Mainnet',
        duration: 400,
        multicallAddress: MULTICALL,
        updated: [
          {
            address: ADDRESS_A,
            data: '0xdead',
            previous: '0xbeef',
            current: '0xf00d',
          },
          {
            address: ADDRESS_A,
            data: '0x12aa',
            previous: undefined,
            current: '0x34bb',
          },
        ],
        persisted: [
          {
            address: ADDRESS_A,
            data: '0x1f00',
            value: '0x2b00',
          },
          {
            address: ADDRESS_B,
            data: '0xcc',
            value: '0xdd',
          },
          {
            address: ADDRESS_C,
            data: '0x1234',
            value: '0x5678',
          },
        ],
      })
      expect(result.state.Mainnet).to.deep.equal(expectedEntries)
      expect(result.events[2]).to.deep.equal(expected)
    })
  })

  describe('generic error', () => {
    it('adds the event to the list of messages', () => {
      const result = stateAfter(
        makeGenericErrorMessage('12:00:00.123', 'Foo'),
        makeGenericErrorMessage('12:14:15.456', 'Bar')
      )
      const expected: State = {
        ...STATE_WITH_INIT,
        events: [INIT_EVENT, makeErrorEvent('+00:00.123', 'Foo'), makeErrorEvent('+14:15.456', 'Bar')],
      }
      expect(result).to.deep.equal(expected)
    })
  })
})

function stateAfter(...messages: Message[]) {
  // we clone messages to ensure referential equality cannot be used on objects
  return messages.map((x) => JSON.parse(JSON.stringify(x)) as Message).reduce(reducer, STATE_WITH_INIT)
}

function toTimestamp(time: string) {
  return new Date(`July 30, 2015 ${time}`).getTime()
}

// messages

function makeInitMessage(time: string): HookMessage<InitPayload> {
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

function makeAccountChangedMessage(time: string, address: string | undefined): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: { type: 'ACCOUNT_CHANGED', address },
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

function makeMulticallSuccessMessage(time: string, options: Omit<MulticallSuccessPayload, 'type'>): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: {
      type: 'MULTICALL_SUCCESS',
      ...options,
    },
  }
}

function makeGenericErrorMessage(time: string, error: string): Message {
  return {
    source: 'usedapp-hook',
    timestamp: toTimestamp(time),
    payload: {
      type: 'GENERIC_ERROR',
      error,
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

function makeAccountConnectedEvent(time: string, address: string): Event {
  return { type: 'ACCOUNT_CONNECTED', time, address }
}

function makeAccountDisconnectedEvent(time: string): Event {
  return { type: 'ACCOUNT_DISCONNECTED', time }
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

function makeStateUpdatedEvent(time: string, options: Omit<StateUpdatedEvent, 'type' | 'time'>): Event {
  return {
    type: 'STATE_UPDATED',
    time,
    ...options,
  }
}

function makeErrorEvent(time: string, error: string): Event {
  return { type: 'ERROR', time, error }
}
