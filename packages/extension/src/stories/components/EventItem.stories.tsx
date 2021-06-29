import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { EventItem } from '../../views/Events/EventItem/EventItem'
import type { Event } from '../../providers/events/State'
import { GlobalStyle } from '../../providers/GlobalStyle'
import { NETWORK_ARGTYPE } from '../args'

export default {
  title: 'Components/EventItem',
  argTypes: {
    network: NETWORK_ARGTYPE,
    type: {
      options: [
        'INIT',
        'NETWORK_CONNECTED',
        'NETWORK_DISCONNECTED',
        'ACCOUNT_CONNECTED',
        'ACCOUNT_DISCONNECTED',
        'BLOCK_FOUND',
        'CALLS_UPDATED',
        'STATE_UPDATED',
        'FETCH_ERROR',
        'ERROR',
      ],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    network: 'Mainnet',
  },
} as Meta

interface Args {
  network: string
  type: Event['type']
}

function getEvent(network: string, type: Event['type']): Event {
  switch (type) {
    case 'INIT':
      return {
        type: 'INIT',
        time: '01:23:45',
      }
    case 'NETWORK_CONNECTED':
      return {
        type: 'NETWORK_CONNECTED',
        time: '+03:10.497',
        chainId: 1,
        network,
      }
    case 'NETWORK_DISCONNECTED':
      return {
        type: 'NETWORK_DISCONNECTED',
        time: '+03:10.497',
      }
    case 'ACCOUNT_CONNECTED':
      return {
        type: 'ACCOUNT_CONNECTED',
        time: '+03:10.497',
        address: '0x12ab12ab12ab12ab12ab12ab12ab12ab12ab12ab',
      }
    case 'ACCOUNT_DISCONNECTED':
      return {
        type: 'ACCOUNT_DISCONNECTED',
        time: '+03:10.497',
      }
    case 'BLOCK_FOUND':
      return {
        type: 'BLOCK_FOUND',
        time: '+03:10.497',
        network,
        blockNumber: 12_345_678,
      }
    case 'CALLS_UPDATED':
      return {
        type: 'CALLS_UPDATED',
        time: '+03:10.497',
        added: [
          { address: '', data: '' },
          { address: '', data: '' },
        ],
        removed: [{ address: '', data: '' }],
        persisted: [],
      }
    case 'STATE_UPDATED':
      return {
        type: 'STATE_UPDATED',
        time: '+03:10.497',
        blockNumber: 12_345_678,
        duration: 321,
        multicallAddress: '0xdeadBeef123456789012345678901234567890AB',
        network,
        updated: [
          { address: '', data: '', current: '', previous: '' },
          { address: '', data: '', current: '', previous: '' },
        ],
        persisted: [],
      }
    case 'FETCH_ERROR':
      return {
        type: 'FETCH_ERROR',
        time: '+03:10.497',
        blockNumber: 12_345_678,
        duration: 321,
        multicallAddress: '0xdeadBeef123456789012345678901234567890AB',
        network,
        error: 'Something went wrong',
        calls: [],
      }
    case 'ERROR':
      return {
        type: 'ERROR',
        time: '+03:10.497',
        error: 'Something went wrong',
      }
  }
}

const Template: Story<Args> = (args) => (
  <>
    <GlobalStyle />
    <EventItem event={getEvent(args.network, args.type)} />
  </>
)

export const Init = Template.bind({})
Init.args = {
  type: 'INIT',
}

export const NetworkConnected = Template.bind({})
NetworkConnected.args = {
  type: 'NETWORK_CONNECTED',
}

export const NetworkDisconnected = Template.bind({})
NetworkDisconnected.args = {
  type: 'NETWORK_DISCONNECTED',
}

export const AccountConnected = Template.bind({})
AccountConnected.args = {
  type: 'ACCOUNT_CONNECTED',
}

export const AccountDisconnected = Template.bind({})
AccountDisconnected.args = {
  type: 'ACCOUNT_DISCONNECTED',
}

export const BlockFound = Template.bind({})
BlockFound.args = {
  type: 'BLOCK_FOUND',
}

export const CallsUpdated = Template.bind({})
CallsUpdated.args = {
  type: 'CALLS_UPDATED',
}

export const StateUpdated = Template.bind({})
StateUpdated.args = {
  type: 'STATE_UPDATED',
}

export const FetchError = Template.bind({})
FetchError.args = {
  type: 'FETCH_ERROR',
}

export const Error = Template.bind({})
Error.args = {
  type: 'ERROR',
}
