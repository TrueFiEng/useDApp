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
  const added = event.added.map((x) => ({ ...x, type: 'added' as const }))
  const removed = event.removed.map((x) => ({ ...x, type: 'removed' as const }))
  const persisted = event.persisted.map((x) => ({ ...x, type: 'persisted' as const }))
  return (
    <>
      {added.length > 0 && (
        <>
          <Label>
            Added calls <Added>+{added.length}</Added>
          </Label>
          <CallList calls={added} network={event.network} />
        </>
      )}
      {removed.length > 0 && (
        <>
          <Label>
            Removed calls <Removed>-{removed.length}</Removed>
          </Label>
          <CallList calls={removed} network={event.network} />
        </>
      )}
      {persisted.length > 0 && (
        <>
          <Label>Persisted calls</Label>
          <CallList calls={persisted} network={event.network} />
        </>
      )}
      {persisted.length === 0 && <Text>No other calls</Text>}
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
