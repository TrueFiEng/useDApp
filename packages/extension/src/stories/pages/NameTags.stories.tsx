import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { NameTags as NameTagsComponent } from '../../views/NameTags/NameTags'
import { NameTagsProvider } from '../../providers/nameTags/NameTagsProvider'

export default {
  title: 'Pages/Name Tags',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const NameTags: Story = () => (
  <NameTagsProvider>
    <GlobalStyle />
    <NameTagsComponent onNavigate={() => undefined} />
  </NameTagsProvider>
)
NameTags.parameters = {
  controls: { hideNoControlsWarning: true },
}
