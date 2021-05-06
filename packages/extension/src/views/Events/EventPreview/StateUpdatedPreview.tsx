import React from 'react'
import styled from 'styled-components'
import type { StateUpdatedEvent } from '../../../providers/events/State'
import { Text } from './components'
import { CallList } from './components/CallList'

interface Props {
  event: StateUpdatedEvent
}

export function StateUpdatedPreview({ event }: Props) {
  return (
    <>
      {event.updated.length > 0 && (
        <>
          <Label>Modified state entries</Label>
          <CallList calls={event.updated} />
        </>
      )}
      {event.persisted.length > 0 && (
        <>
          <Label>Persisted state entries</Label>
          <CallList calls={event.persisted} />
        </>
      )}
      {event.persisted.length === 0 && <Text>No other state</Text>}
    </>
  )
}

const Label = styled.p`
  font-weight: bold;
  margin: 0 0 15px 0;
`
