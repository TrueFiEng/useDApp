import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { GlobalStyle } from '../../providers/GlobalStyle'
import { Abis as AbisComponent } from '../../views/Abis/Abis'
import { AbiProvider } from '../../providers/abi/AbiProvider'

export default {
  title: 'Pages/Abis',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const Abis: Story = () => (
  <AbiProvider>
    <GlobalStyle />
    <AbisComponent onNavigate={() => undefined} />
  </AbiProvider>
)
Abis.parameters = {
  controls: { hideNoControlsWarning: true },
}
