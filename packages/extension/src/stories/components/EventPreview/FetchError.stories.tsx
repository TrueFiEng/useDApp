import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Interface } from '@ethersproject/abi'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { FetchErrorPreview } from '../../../views/Events/EventPreview/FetchErrorPreview'
import { AbiProvider } from '../../../providers/abi/AbiProvider'

export default {
  title: 'Components/EventPreview/Fetch Error',
} as Meta

const coder = new Interface(['function balanceOf(address owner) returns (uint)'])
const EXAMPLE_CALL = {
  address: '0x12ab34cd5612ab34cd5612ab34cd5612ab34cd56',
  data: coder.encodeFunctionData('balanceOf', ['0xefabcd1234efabcd1234efabcd1234efabcd1234']),
}

export const FetchError: Story = () => (
  <AbiProvider>
    <GlobalStyle />
    <FetchErrorPreview
      event={{
        type: 'FETCH_ERROR',
        time: '+03:10.497',
        network: 'Mainnet',
        blockNumber: 12_345_678,
        duration: 300,
        error: 'Something went wrong',
        multicallAddress: '0x12ab34cd5612ab34cd5612ab34cd5612ab34cd56',
        calls: [EXAMPLE_CALL, EXAMPLE_CALL],
      }}
    />
  </AbiProvider>
)
FetchError.parameters = {
  controls: { hideNoControlsWarning: true },
}
