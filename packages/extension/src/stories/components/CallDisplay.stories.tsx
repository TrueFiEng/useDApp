import React, { ComponentProps } from 'react'
import type { Story, Meta } from '@storybook/react'

import { CallDisplay } from '../../views/Events/EventPreview/components/CallDisplay'
import { GlobalStyle } from '../../providers/GlobalStyle'
import { NETWORK_ARGTYPE } from '../args'
import { NameTagsContext } from '../../providers/nameTags/NameTagsProvider'

export default {
  title: 'Components/CallDisplay',
  component: CallDisplay,
  argTypes: {
    network: NETWORK_ARGTYPE,
  },
  args: {
    network: 'Mainnet',
  },
} as Meta

const ADDRESS_1 = '0x1a2b000000000000000000000000000000003c4d'
const ADDRESS_2 = '0xf420000000000000000000000000000000002137'
const ADDRESS_3 = '0x5678000000000000000000000000000000009abc'

const Template: Story<ComponentProps<typeof CallDisplay>> = (args) => (
  <NameTagsContext.Provider
    value={{
      nameTags: [],
      setNameTags: () => undefined,
      getNameTag: (a) => (a === ADDRESS_3 ? 'Uncle Joe' : undefined),
    }}
  >
    <GlobalStyle />
    <CallDisplay {...args} />
  </NameTagsContext.Provider>
)

export const SimpleCall = Template.bind({})
SimpleCall.args = {
  address: ADDRESS_1,
  name: 'balanceOf',
  data: [{ name: 'owner', type: 'address', value: ADDRESS_2 }],
}

export const NoArguments = Template.bind({})
NoArguments.args = {
  address: ADDRESS_1,
  name: 'currentTime',
  data: [],
}

export const UnknownCall = Template.bind({})
UnknownCall.args = {
  address: ADDRESS_1,
  name: '4a25d94a',
  data: [
    {
      type: 'bytes',
      name: 'data',
      value:
        '00000000000000000000000095ad61b0a150d79219dcf64e1e6cc01f0b64c4ce000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
  ],
}

export const BasicTypes = Template.bind({})
BasicTypes.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [
    { type: 'address', name: 'address', value: ADDRESS_2 },
    { type: 'address', name: 'known address', value: ADDRESS_3 },
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

export const Arrays = Template.bind({})
Arrays.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [
    { type: 'array', name: 'zero', value: [] },
    {
      type: 'array',
      name: 'one',
      value: [{ type: 'number', name: '#0', value: '123' }],
    },
    {
      type: 'array',
      name: 'two',
      value: [
        { type: 'number', name: 'mickey', value: '123' },
        { type: 'number', name: 'mouse', value: '45' },
      ],
    },
    {
      type: 'array',
      name: 'nested',
      value: [
        {
          type: 'array',
          name: '#0',
          value: [
            { type: 'boolean', name: '#0', value: true },
            { type: 'boolean', name: '#1', value: true },
          ],
        },
        {
          type: 'array',
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

export const SimpleResult = Template.bind({})
SimpleResult.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [],
  value: { type: 'number', name: '#0', value: '3' },
}

export const TupleResult = Template.bind({})
TupleResult.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [],
  value: {
    type: 'tuple',
    name: '#0',
    value: [
      { type: 'number', name: '#0', value: '3' },
      { type: 'number', name: '#1', value: '42' },
    ],
  },
}

export const ResultAdded = Template.bind({})
ResultAdded.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [],
  previous: undefined,
  current: { type: 'number', name: '#0', value: '3' },
}

export const ResultRemoved = Template.bind({})
ResultRemoved.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [],
  previous: { type: 'number', name: '#0', value: '3' },
  current: undefined,
}

export const ResultModified = Template.bind({})
ResultModified.args = {
  address: ADDRESS_1,
  name: 'example',
  data: [],
  previous: { type: 'number', name: '#0', value: '3' },
  current: { type: 'number', name: '#0', value: '42' },
}
