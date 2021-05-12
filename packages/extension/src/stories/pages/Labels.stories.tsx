import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { Labels as LabelsComponent } from '../../views/Labels/Labels'

export default {
  title: 'Pages/Labels',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Labels: Story = () => (
  <>
    <GlobalStyle />
    <LabelsComponent onNavigate={() => undefined} />
  </>
)
Labels.parameters = {
  controls: { hideNoControlsWarning: true },
}
