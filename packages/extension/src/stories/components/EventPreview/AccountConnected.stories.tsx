import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { AccountConnectedPreview } from '../../../views/Events/EventPreview/AccountConnectedPreview'

export default {
  title: 'Components/EventPreview/Account Connected',
} as Meta

export const AccountConnected: Story = () => (
  <>
    <GlobalStyle />
    <AccountConnectedPreview
      event={{
        type: 'ACCOUNT_CONNECTED',
        time: '+03:10.497',
        address: '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
      }}
    />
  </>
)
AccountConnected.parameters = {
  controls: { hideNoControlsWarning: true },
}
