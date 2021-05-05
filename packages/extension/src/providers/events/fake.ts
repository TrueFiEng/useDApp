export function fakeEvents(dispatch: (event: any) => void) {
  const speed = 4
  let now = FAKE_EVENTS[0].timestamp
  let index = 0
  let timeout = setTimeout(onEvent, 0)
  function onEvent() {
    dispatch(FAKE_EVENTS[index])
    now = FAKE_EVENTS[index].timestamp
    index += 1
    if (index === FAKE_EVENTS.length) {
      index = 1
      now = FAKE_EVENTS[0].timestamp
    }
    timeout = setTimeout(onEvent, (FAKE_EVENTS[index].timestamp - now) / speed)
  }
  return () => clearTimeout(timeout)
}

export const FAKE_EVENTS = [
  { source: 'usedapp-hook', timestamp: 1620218915387, payload: { type: 'INIT' } },
  { source: 'usedapp-hook', timestamp: 1620218915648, payload: { type: 'NETWORK_CHANGED' } },
  { source: 'usedapp-hook', timestamp: 1620218915682, payload: { type: 'NETWORK_CHANGED', chainId: 1 } },
  {
    source: 'usedapp-hook',
    timestamp: 1620218915743,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 1,
      calls: [
        {
          address: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
          data: '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218916996,
    payload: { type: 'BLOCK_NUMBER_CHANGED', chainId: 1, blockNumber: 12374283 },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218917355,
    payload: {
      type: 'MULTICALL_SUCCESS',
      duration: 363,
      chainId: 1,
      blockNumber: 12374283,
      multicallAddress: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
      state: {
        '0xeefba1e63905ef1d7acba5a8513c70307c1ce441': {
          '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa':
            '0x000000000000000000000000000000000000000000037aaa6d68f6c7aac55045',
        },
      },
    },
  },
  { source: 'usedapp-hook', timestamp: 1620218921011, payload: { type: 'CALLS_CHANGED', chainId: 4, calls: [] } },
  { source: 'usedapp-hook', timestamp: 1620218921011, payload: { type: 'NETWORK_CHANGED', chainId: 4 } },
  {
    source: 'usedapp-hook',
    timestamp: 1620218921072,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 4,
      calls: [
        {
          address: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
          data: '0x4d2301cc000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
          data: '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218921131,
    payload: { type: 'BLOCK_NUMBER_CHANGED', chainId: 4, blockNumber: 8532278 },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218921341,
    payload: {
      type: 'MULTICALL_SUCCESS',
      duration: 211,
      chainId: 4,
      blockNumber: 8532278,
      multicallAddress: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
      state: {
        '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821': {
          '0x4d2301cc000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8':
            '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa':
            '0x0000000000000000000000000000000000000000000000007ce6c743f2fe4000',
        },
      },
    },
  },
  { source: 'usedapp-hook', timestamp: 1620218924953, payload: { type: 'CALLS_CHANGED', chainId: 42, calls: [] } },
  { source: 'usedapp-hook', timestamp: 1620218924954, payload: { type: 'NETWORK_CHANGED', chainId: 42 } },
  {
    source: 'usedapp-hook',
    timestamp: 1620218925020,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 42,
      calls: [
        {
          address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
          data: '0x4d2301cc000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
          data: '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218929537,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 42,
      calls: [
        {
          address: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
          data: '0x70a08231000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0xAaF64BFCC32d0F15873a02163e7E500671a4ffcD',
          data: '0x70a08231000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
          data: '0x70a08231000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
          data: '0x70a08231000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218931437,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 42,
      calls: [
        { address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a', data: '0x0f28c97d' },
        { address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a', data: '0x72425d9d' },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218933090,
    payload: {
      type: 'CALLS_CHANGED',
      chainId: 42,
      calls: [
        {
          address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
          data: '0x4d2301cc000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8',
        },
        {
          address: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
          data: '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa',
        },
      ],
    },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218933529,
    payload: { type: 'BLOCK_NUMBER_CHANGED', chainId: 42, blockNumber: 24671079 },
  },
  {
    source: 'usedapp-hook',
    timestamp: 1620218933745,
    payload: {
      type: 'MULTICALL_SUCCESS',
      duration: 218,
      chainId: 42,
      blockNumber: 24671079,
      multicallAddress: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
      state: {
        '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a': {
          '0x4d2301cc000000000000000000000000ae5110dff42f24393981b63deec68ac705e125b8':
            '0x0000000000000000000000000000000000000000000000001bc16d674ec80000',
          '0x4d2301cc00000000000000000000000000000000219ab540356cbb839cbe05303d7705fa':
            '0x000000000000000000000000000000000000000000000001bc6fa7e4bc01c3d7',
        },
      },
    },
  },
]
