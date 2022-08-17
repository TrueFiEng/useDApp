import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../../providers/GlobalStyle'
import { InitializedPreview } from '../../../views/Events/EventPreview/InitializedPreview'

export default {
  title: 'Components/EventPreview/Initialized',
  component: InitializedPreview,
} as Meta

export const Initialized: Story = () => (
  <>
    <GlobalStyle />
    <InitializedPreview />
  </>
)
Initialized.parameters = {
  controls: { hideNoControlsWarning: true },
}
