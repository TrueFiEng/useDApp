import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { ErrorPreview } from '../../../views/Events/EventPreview/ErrorPreview'
import { AbiProvider } from '../../../providers/abi/AbiProvider'

export default {
  title: 'Components/EventPreview/Error',
} as Meta

export const Error: Story = () => (
  <AbiProvider>
    <GlobalStyle />
    <ErrorPreview
      event={{
        type: 'ERROR',
        time: '+03:10.497',
        error: 'Something went wrong',
      }}
    />
  </AbiProvider>
)
Error.parameters = {
  controls: { hideNoControlsWarning: true },
}
