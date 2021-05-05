import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'
import type { Event } from '../../providers/events/State'
import { EventListItem } from './EventListItem'

interface Props {
  events: Event[]
}

export function EventList({ events }: Props) {
  return (
    <Wrapper>
      <Header>Events</Header>
      <ListWrapper>
        <List>
          {events.map((e, i) => (
            <EventListItem key={i} event={e} />
          ))}
        </List>
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.header`
  font-size: 18px;
  padding: 8px 0 8px 99px;
  background-color: ${Colors.Background2};
  border-bottom: 1px solid ${Colors.Border2};
`

const ListWrapper = styled.div`
  overflow: auto;
  flex: 1;
`

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style-type: none;
`
