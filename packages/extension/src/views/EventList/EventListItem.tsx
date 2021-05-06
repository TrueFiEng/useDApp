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
  selected: boolean
  onSelect: (event: Event) => void
}

export const EventListItem = React.memo(function ({ event, selected, onSelect }: Props) {
  const networkColor = getNetworkColor(event)
  return (
    <ListItem className={selected ? 'selected' : ''} onClick={() => onSelect(event)}>
      <Time>{event.time}</Time>
      <NetworkIndicator style={{ backgroundColor: networkColor }} />
      <Badge event={event} />
      <Label>{getEventLabel(event)}</Label>
      <Latency event={event} />
    </ListItem>
  )
})

const ListItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.Background};
  border-bottom-color: ${Colors.Border};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Hover};
  }

  &.selected {
    background-color: ${Colors.Selected};
    border-color: ${Colors.SelectedBorder};
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
