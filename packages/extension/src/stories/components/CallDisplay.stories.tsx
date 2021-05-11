import React, { ComponentProps } from 'react'
import type { Story, Meta } from '@storybook/react'

import { CallDisplay } from '../../views/Events/EventPreview/components/CallDisplay'
import { GlobalStyle } from '../../providers/GlobalStyle'
import { NETWORK_ARGTYPE } from '../args'

export default {
  title: 'Components/CallDisplay',
  component: CallDisplay,
  argTypes: {
    network: NETWORK_ARGTYPE,
    type: {
      control: {
        type: 'select',
      },
    },
  },
  args: {
    network: 'Mainnet',
  },
} as Meta

const ADDRESS_1 = '0x1a2b000000000000000000000000000000003c4d'
const ADDRESS_2 = '0xf420000000000000000000000000000000002137'

const Template: Story<ComponentProps<typeof CallDisplay>> = (args) => (
  <>
    <GlobalStyle />
    <CallDisplay {...args} />
  </>
)

export const SimpleCall = Template.bind({})
SimpleCall.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
}

export const Added = Template.bind({})
Added.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
  type: 'added',
}

export const Removed = Template.bind({})
Removed.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
  type: 'removed',
}

export const Updated = Template.bind({})
Updated.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
  type: 'updated',
}

export const Persisted = Template.bind({})
Persisted.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
  type: 'persisted',
}

export const NoArguments = Template.bind({})
NoArguments.args = {
  address: ADDRESS_1,
  name: 'currentTime',
  data: [],
}

export const BasicTypes = Template.bind({})
BasicTypes.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [
    { type: 'address', name: 'address', value: ADDRESS_2 },
    { type: 'number', name: 'number', value: '13370000000000069420' },
    { type: 'number', name: 'negative', value: '-500100900' },
    { type: 'boolean', name: 'boolean', value: true },
    { type: 'string', name: 'string', value: 'One to rule them all' },
    {
      type: 'bytes',
      name: 'bytes',
      value:
        '000000000000000000000000ec0bf0e934d092d31e769e8c9722ffbaa582db3b000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
    { type: 'bytes', name: 'zero bytes', value: '' },
  ],
}

export const Tuples = Template.bind({})
Tuples.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [
    { type: 'tuple', name: 'zero', value: [] },
    {
      type: 'tuple',
      name: 'one',
      value: [{ type: 'number', name: '#0', value: '123' }],
    },
    {
      type: 'tuple',
      name: 'two',
      value: [
        { type: 'number', name: 'mickey', value: '123' },
        { type: 'number', name: 'mouse', value: '45' },
      ],
    },
    {
      type: 'tuple',
      name: 'nested',
      value: [
        {
          type: 'tuple',
          name: '#0',
          value: [
            { type: 'boolean', name: '#0', value: true },
            { type: 'boolean', name: '#1', value: true },
          ],
        },
        {
          type: 'tuple',
          name: '#1',
          value: [
            { type: 'boolean', name: '#0', value: false },
            { type: 'boolean', name: '#1', value: false },
          ],
        },
        { type: 'number', name: 'answer', value: '42' },
      ],
    },
  ],
}
