import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { BlockFoundPreview } from '../../../views/Events/EventPreview/BlockFoundPreview'
import { NETWORK_ARGTYPE } from '../../args'

export default {
  title: 'Components/EventPreview/Block Found',
  argTypes: {
    network: NETWORK_ARGTYPE,
  },
  args: {
    network: 'Mainnet',
    blockNumber: 12_345_678,
  },
} as Meta

interface Args {
  network: string
  blockNumber: number
}

export const BlockFound: Story<Args> = (args) => (
  <>
    <GlobalStyle />
    <BlockFoundPreview
      event={{
        type: 'BLOCK_FOUND',
        time: '01:23:45',
        blockNumber: args.blockNumber,
        network: args.network,
      }}
    />
  </>
)
