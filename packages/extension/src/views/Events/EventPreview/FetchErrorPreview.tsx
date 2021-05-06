import React from 'react'
import styled from 'styled-components'
import type { FetchErrorEvent } from '../../../providers/events/State'
import { Text } from './components'
import { CallList } from './components/CallList'

interface Props {
  event: FetchErrorEvent
}

export function FetchErrorPreview({ event }: Props) {
  return (
    <>
      <Label>Error</Label>
      <Text>{event.error}</Text>
      <Label>Calls</Label>
      <CallList calls={event.calls} />
    </>
  )
}

const Label = styled.p`
  font-weight: bold;
  margin: 0 0 15px 0;
`
