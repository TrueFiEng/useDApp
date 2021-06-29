import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Interface } from '@ethersproject/abi'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { StateUpdatedPreview } from '../../../views/Events/EventPreview/StateUpdatedPreview'
import { AbiProvider } from '../../../providers/abi/AbiProvider'
import type { StateEntry } from '../../../providers/events/State'

export default {
  title: 'Components/EventPreview/State Updated',
  args: {
    persisted: 1,
  },
} as Meta

interface Args {
  persisted: number
}

const ADDRESS = '0x12ab34cd5612ab34cd5612ab34cd5612ab34cd56'
const coder = new Interface(['function balanceOf(address owner) returns (uint)'])
const EXAMPLE_PERSISTED = {
  address: ADDRESS,
  data: coder.encodeFunctionData('balanceOf', [ADDRESS]),
  value: '0x000000000000000000000000000000000000000000000000000000000012d687',
}

export const StateUpdated: Story<Args> = (args) => (
  <AbiProvider>
    <GlobalStyle />
    <StateUpdatedPreview
      event={{
        type: 'STATE_UPDATED',
        time: '+03:10.497',
        network: 'Mainnet',
        blockNumber: 12_345_678,
        duration: 321,
        multicallAddress: ADDRESS,
        updated: [
          {
            address: ADDRESS,
            data: coder.encodeFunctionData('balanceOf', [ADDRESS]),
            previous: undefined,
            current: '0x000000000000000000000000000000000000000000000000000000000012d687',
          },
          {
            address: ADDRESS,
            data: coder.encodeFunctionData('balanceOf', [ADDRESS]),
            previous: '0x000000000000000000000000000000000000000000000000000000000012d687',
            current: undefined,
          },
          {
            address: ADDRESS,
            data: coder.encodeFunctionData('balanceOf', [ADDRESS]),
            previous: '0x000000000000000000000000000000000000000000000000000000000012d687',
            current: '0x00000000000000000000000000000000000000000000000000000000abcdef12',
          },
        ],
        persisted: new Array<StateEntry>(args.persisted).fill(EXAMPLE_PERSISTED),
      }}
    />
  </AbiProvider>
)
