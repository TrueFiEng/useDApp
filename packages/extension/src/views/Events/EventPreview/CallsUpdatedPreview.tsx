import React from 'react'
import type { CallsUpdatedEvent } from '../../../providers/events/State'
import { Text, Title } from '../../shared'
import { CallList } from './components/CallList'

interface Props {
  event: CallsUpdatedEvent
}

export function CallsUpdatedPreview({ event }: Props) {
  return (
    <>
      <Text>The application has requested different state to be fetched.</Text>
      {event.added.length > 0 && (
        <>
          <Title>Added calls:</Title>
          <CallList calls={event.added} network={event.network} />
        </>
      )}
      {event.removed.length > 0 && (
        <>
          <Title>Removed calls:</Title>
          <CallList calls={event.removed} network={event.network} />
        </>
      )}
      {event.persisted.length > 0 && (
        <>
          <Title>Persisted calls:</Title>
          <CallList calls={event.persisted} network={event.network} />
        </>
      )}
      {event.persisted.length === 0 && <Text>No other calls</Text>}
    </>
  )
}
