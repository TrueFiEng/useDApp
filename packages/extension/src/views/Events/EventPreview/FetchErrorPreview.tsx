import React from 'react'
import type { FetchErrorEvent } from '../../../providers/events/State'
import { Text, Title } from '../../shared'
import { CallList } from './components/CallList'

interface Props {
  event: FetchErrorEvent
}

export function FetchErrorPreview({ event }: Props) {
  return (
    <>
      <Text>
        An error happened when trying to update the state. This might happen because one of the requested calls
        reverted.
      </Text>
      <Title>Error message:</Title>
      <Text>{event.error}</Text>
      <Title>Calls:</Title>
      <CallList calls={event.calls} network={event.network} />
    </>
  )
}
