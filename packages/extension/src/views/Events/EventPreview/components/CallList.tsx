import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../../design'
import { Call, GeneralizedCall } from './Call'

interface Props {
  calls: GeneralizedCall[]
  network: string | undefined
}

export function CallList({ calls, network }: Props) {
  return (
    <List>
      {calls.map((call, i) => (
        <Item key={i}>
          <Call call={call} network={network} />
        </Item>
      ))}
    </List>
  )
}

const List = styled.ul`
  list-style-type: none;
  margin: 0 0 15px 0;
  padding: 0;
`

const Item = styled.li`
  margin: 0 0 15px 0;

  &:not(:last-child) {
    padding-bottom: 15px;
    border-bottom: 1px solid ${Colors.Border};
  }
`
