import React from 'react'
import type { FetchErrorEvent } from '../../../providers/events/State'
import { Text, Title } from './components'
import { CallList } from './components/CallList'

interface Props {
  event: FetchErrorEvent
}

export function FetchErrorPreview({ event }: Props) {
  return (
    <>
      <Title>Error message:</Title>
      <Text>{event.error}</Text>
      <Title>Calls:</Title>
      <CallList calls={event.calls} network={event.network} />
    </>
  )
}
