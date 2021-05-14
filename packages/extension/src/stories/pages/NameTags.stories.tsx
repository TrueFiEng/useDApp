import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { NameTags as NameTagsComponent } from '../../views/NameTags/NameTags'

export default {
  title: 'Pages/Name Tags',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const NameTags: Story = () => (
  <>
    <GlobalStyle />
    <NameTagsComponent onNavigate={() => undefined} />
  </>
)
NameTags.parameters = {
  controls: { hideNoControlsWarning: true },
}
