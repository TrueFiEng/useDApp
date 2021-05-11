import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { EventItem } from '../EventItem/EventItem'

interface Props {
  event: Event
  selected: boolean
  onSelect: (event: Event) => void
}

export const EventListItem = React.memo(function ({ event, selected, onSelect }: Props) {
  return (
    <ListItem className={selected ? 'selected' : ''} onClick={() => onSelect(event)}>
      <EventItem event={event} />
    </ListItem>
  )
})

const ListItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.Background};
  border-bottom-color: ${Colors.Border};
  cursor: pointer;
  padding: 0 8px;

  &:hover {
    background-color: ${Colors.Hover};
  }

  &.selected {
    background-color: ${Colors.Selected};
    border-color: ${Colors.SelectedBorder};
  }
`
