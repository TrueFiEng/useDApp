import React from 'react'
import type { Story, Meta } from '@storybook/react'
import { Interface } from '@ethersproject/abi'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { EventContext } from '../../providers/events/EventProvider'
import { Events as EventsComponent } from '../../views/Events/Events'
import type { Event } from '../../providers/events/State'
import { DEFAULT_ABIS } from '../../providers/abi/defaultAbis'
import { AbiProvider } from '../../providers/abi/AbiProvider'

export default {
  title: 'Pages/Events',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

const coder = new Interface(DEFAULT_ABIS)
const TOKEN_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const HOLDER_ADDRESS = '0xab5801a7d398351b8be11c439e05c5b3259aec9b'

const events: Event[] = [
  {
    type: 'INIT',
    time: '12:01:13',
  },
  {
    type: 'NETWORK_CONNECTED',
    time: '12:01:15',
    chainId: 42,
    network: 'Kovan',
  },
  {
    type: 'CALLS_UPDATED',
    time: '12:01:15',
    network: 'Kovan',
    added: [
      {
        address: TOKEN_ADDRESS,
        data: coder.encodeFunctionData('balanceOf', [HOLDER_ADDRESS]),
      },
      {
        address: TOKEN_ADDRESS,
        data: coder.encodeFunctionData('allowance', [HOLDER_ADDRESS, TOKEN_ADDRESS]),
      },
    ],
    removed: [],
    persisted: [],
  },
  {
    type: 'BLOCK_FOUND',
    time: '12:01:16',
    network: 'Kovan',
    blockNumber: 20_123_123,
  },
  {
    type: 'STATE_UPDATED',
    time: '12:01:18',
    network: 'Kovan',
    duration: 3124,
    blockNumber: 20_123_123,
    multicallAddress: '0x' + '0'.repeat(40),
    updated: [
      {
        address: TOKEN_ADDRESS,
        data: coder.encodeFunctionData('balanceOf', [HOLDER_ADDRESS]),
        previous: undefined,
        current: coder.encodeFunctionResult('balanceOf', ['32' + '0'.repeat(18)]),
      },
      {
        address: TOKEN_ADDRESS,
        data: coder.encodeFunctionData('allowance', [HOLDER_ADDRESS, TOKEN_ADDRESS]),
        previous: undefined,
        current: coder.encodeFunctionResult('allowance', [0]),
      },
    ],
    persisted: [],
  },
]

export const Events: Story = () => (
  <AbiProvider>
    <EventContext.Provider value={events}>
      <GlobalStyle />
      <EventsComponent />
    </EventContext.Provider>
  </AbiProvider>
)
Events.parameters = {
  controls: { hideNoControlsWarning: true },
}
