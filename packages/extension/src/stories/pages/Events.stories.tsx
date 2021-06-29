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
const TOKEN_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const HOLDER_ADDRESS = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B'

const events: Event[] = [
  {
    type: 'INIT',
    time: '12:01:13.782',
  },
  {
    type: 'NETWORK_CONNECTED',
    time: '+00:01.125',
    chainId: 42,
    network: 'Kovan',
  },
  {
    type: 'ACCOUNT_CONNECTED',
    time: '+00:05.827',
    address: HOLDER_ADDRESS,
  },
  {
    type: 'CALLS_UPDATED',
    time: '+00:06.014',
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
    time: '+00:15.981',
    network: 'Kovan',
    blockNumber: 20_123_123,
  },
  {
    type: 'STATE_UPDATED',
    time: '+00:19.105',
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
  {
    type: 'ERROR',
    time: '+00:23.323',
    error: 'An extra long error message for your pleasure.',
  },
]

export const Events: Story = () => (
  <AbiProvider>
    <EventContext.Provider value={events}>
      <GlobalStyle />
      <EventsComponent onNavigate={() => undefined} />
    </EventContext.Provider>
  </AbiProvider>
)
Events.parameters = {
  controls: { hideNoControlsWarning: true },
}
