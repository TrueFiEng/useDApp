import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { Abis as AbisComponent } from '../../views/Abis/Abis'

export default {
  title: 'Pages/Abis',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Abis: Story = () => (
  <>
    <GlobalStyle />
    <AbisComponent onNavigate={() => undefined} />
  </>
)
Abis.parameters = {
  controls: { hideNoControlsWarning: true },
}
