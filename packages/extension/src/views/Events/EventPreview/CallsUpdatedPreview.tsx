import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { CallsUpdatedEvent } from '../../../providers/events/State'
import { Text } from './components'
import { CallList } from './components/CallList'

interface Props {
  event: CallsUpdatedEvent
}

export function CallsUpdatedPreview({ event }: Props) {
  return (
    <>
      {event.added.length > 0 && (
        <>
          <Label>
            Added calls <Added>+{event.added.length}</Added>
          </Label>
          <CallList calls={event.added.map((x) => ({ ...x, type: 'added' }))} />
        </>
      )}
      {event.removed.length > 0 && (
        <>
          <Label>
            Removed calls <Removed>-{event.removed.length}</Removed>
          </Label>
          <CallList calls={event.removed.map((x) => ({ ...x, type: 'removed' }))} />
        </>
      )}
      {event.persisted.length > 0 && (
        <>
          <Label>Persisted calls</Label>
          <CallList calls={event.persisted.map((x) => ({ ...x, type: 'persisted' }))} />
        </>
      )}
      {event.persisted.length === 0 && <Text>No other calls</Text>}
    </>
  )
}

const Added = styled.span`
  color: ${Colors.Added};
`

const Removed = styled.span`
  color: ${Colors.Removed};
`

const Label = styled.p`
  font-weight: bold;
  margin: 0 0 15px 0;
`
