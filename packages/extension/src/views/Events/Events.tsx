import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'
import { EventContext } from '../../providers/events/EventProvider'
import type { Event } from '../../providers/events/State'
import { EventList } from './EventList/EventList'
import { EventPreview } from './EventPreview/EventPreview'

export function Events() {
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const events = useContext(EventContext)

  return (
    <Wrapper>
      <Header>Events</Header>
      <EventList events={events} selected={event} onSelect={setEvent} />
      <EventPreview event={event} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Header = styled.header`
  font-size: 18px;
  padding: 12px 0 12px 100px;
  background-color: ${Colors.Background2};
  border-bottom: 1px solid ${Colors.Border2};
`
