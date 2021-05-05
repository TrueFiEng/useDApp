import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'
import type { Event } from '../../providers/events/State'
import { Badge } from './Badge'
import { getEventLabel } from './getEventLabel'
import { getNetworkColor } from './getNetworkColor'
import { Latency } from './Latency'

interface Props {
  event: Event
}

export function EventListItem({ event }: Props) {
  const networkColor = getNetworkColor(event)
  return (
    <ListItem>
      <Time>{event.time}</Time>
      <NetworkIndicator style={{ backgroundColor: networkColor }} />
      <Badge event={event} />
      <Label>{getEventLabel(event)}</Label>
      <Latency event={event} />
    </ListItem>
  )
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Colors.Border};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Hover};
  }
`

const Time = styled.div`
  color: ${Colors.Text2};
  font-size: 14px;
  margin-left: 8px;
`

const NetworkIndicator = styled.div`
  height: 32px;
  width: 6px;
  margin: 1px 8px 1px 8px;
`

const Label = styled.div``
