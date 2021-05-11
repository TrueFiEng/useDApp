import React from 'react'
import styled from 'styled-components'
import { Call, GeneralizedCall } from './Call'

interface Props {
  calls: GeneralizedCall[]
}

export function CallList({ calls }: Props) {
  return (
    <List>
      {calls.map((call, i) => (
        <Item key={i}>
          <Call call={call} />
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
`
