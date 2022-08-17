import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { AccountDisconnectedPreview } from '../../../views/Events/EventPreview/AccountDisconnectedPreview'

export default {
  title: 'Components/EventPreview/Account Disconnected',
  component: AccountDisconnectedPreview,
} as Meta

export const AccountDisconnected: Story = () => (
  <>
    <GlobalStyle />
    <AccountDisconnectedPreview />
  </>
)
AccountDisconnected.parameters = {
  controls: { hideNoControlsWarning: true },
}
