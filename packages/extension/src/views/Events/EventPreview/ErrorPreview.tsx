import React from 'react'
import type { ErrorEvent } from '../../../providers/events/State'
import { Link } from './components'
import { Text, Title } from '../../shared'

interface Props {
  event: ErrorEvent
}

export function ErrorPreview({ event }: Props) {
  return (
    <>
      <Title>Error message:</Title>
      <Text>{event.error}</Text>
    </>
  )
}
