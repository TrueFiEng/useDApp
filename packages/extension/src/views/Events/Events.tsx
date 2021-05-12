import React, { useState } from 'react'
import styled from 'styled-components'
import { useEvents } from '../../hooks'
import type { Event } from '../../providers/events/State'
import { Header } from '../Header'
import { EventList } from './EventList/EventList'
import { EventPreview } from './EventPreview/EventPreview'

interface Props {
  onNavigate: (page: string) => void
}

export function Events({ onNavigate }: Props) {
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const events = useEvents()

  return (
    <Wrapper>
      <Header page="events" onChange={onNavigate} />
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
