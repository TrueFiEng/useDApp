import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { ValueItem } from './ValueItem'

interface Props {
  values: ParsedValue[]
  network: string | undefined
}

export function ValueList({ values, network }: Props) {
  return (
    <List>
      {values.map((v, i) => (
        <Item data-type={v.type} key={i}>
          <Key>{v.name}:&nbsp;</Key>
          <ValueItem value={v} network={network} />
        </Item>
      ))}
    </List>
  )
}

const List = styled.ol`
  padding-left: 2ch;
  margin: 0;
  list-style-type: none;
`

const Item = styled.li`
  &[data-type='bytes'] {
    display: flex;
    align-items: baseline;
  }
`

const Key = styled.span`
  font-family: ${Font.Code};
  color: ${Colors.Text2};
  font-size: 14px;
`
