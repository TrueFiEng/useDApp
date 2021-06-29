import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { NetworkDisconnectedPreview } from '../../../views/Events/EventPreview/NetworkDisconnectedPreview'

export default {
  title: 'Components/EventPreview/Network Disconnected',
  component: NetworkDisconnectedPreview,
} as Meta

export const NetworkDisconnected: Story = () => (
  <>
    <GlobalStyle />
    <NetworkDisconnectedPreview />
  </>
)
NetworkDisconnected.parameters = {
  controls: { hideNoControlsWarning: true },
}
