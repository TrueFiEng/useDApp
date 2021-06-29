import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Interface } from '@ethersproject/abi'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { CallsUpdatedPreview } from '../../../views/Events/EventPreview/CallsUpdatedPreview'
import { AbiProvider } from '../../../providers/abi/AbiProvider'
import type { ChainCall } from '../../../providers/events/Message'

export default {
  title: 'Components/EventPreview/Calls Updated',
  args: {
    added: 1,
    removed: 1,
    persisted: 1,
  },
} as Meta

interface Args {
  added: number
  removed: number
  persisted: number
}

const coder = new Interface(['function balanceOf(address owner) returns (uint)'])
const EXAMPLE_CALL = {
  address: '0x12ab34cd5612ab34cd5612ab34cd5612ab34cd56',
  data: coder.encodeFunctionData('balanceOf', ['0xefabcd1234efabcd1234efabcd1234efabcd1234']),
}

export const CallsUpdated: Story<Args> = (args) => (
  <AbiProvider>
    <GlobalStyle />
    <CallsUpdatedPreview
      event={{
        type: 'CALLS_UPDATED',
        time: '+03:10.497',
        added: new Array<ChainCall>(args.added).fill(EXAMPLE_CALL),
        removed: new Array<ChainCall>(args.removed).fill(EXAMPLE_CALL),
        persisted: new Array<ChainCall>(args.persisted).fill(EXAMPLE_CALL),
      }}
    />
  </AbiProvider>
)
