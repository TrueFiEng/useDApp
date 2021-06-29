import React, { useState } from 'react'
import { useEvents } from '../../hooks'
import type { Event } from '../../providers/events/State'
import { Page } from '../shared'
import { EventList } from './EventList/EventList'
import { EventPreview } from './EventPreview/EventPreview'

interface Props {
  onNavigate: (page: string) => void
}

export function Events({ onNavigate }: Props) {
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const events = useEvents()

  return (
    <Page name="events" onNavigate={onNavigate}>
      <EventList events={events} selected={event} onSelect={setEvent} />
      <EventPreview event={event} />
    </Page>
  )
}
