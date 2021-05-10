import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../../providers/GlobalStyle'
import { NetworkConnectedPreview } from '../NetworkConnectedPreview'

export default {
  title: 'Components/EventPreview/Network Connected',
  argTypes: {
    network: {
      options: ['Mainnet', 'Ropsten', 'Rinkeby', 'Goerli', 'Kovan', 'xDai', 'Localhost', 'Hardhat', 'Other'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    network: 'Mainnet',
    chainId: 1,
  },
} as Meta

interface Args {
  network: string
  chainId: number
  blockNumber: number
}

export const NetworkConnected: Story<Args> = (args) => (
  <>
    <GlobalStyle />
    <NetworkConnectedPreview
      event={{
        type: 'NETWORK_CONNECTED',
        time: '01:23:45',
        chainId: args.chainId,
        network: args.network,
      }}
    />
  </>
)
