import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { formatInteger } from './formatInteger'

interface Props {
  event: Event
}

export function Latency({ event }: Props) {
  if (event.type === 'STATE_UPDATED' || event.type === 'FETCH_ERROR') {
    return <Element>({formatInteger(event.duration)}ms)</Element>
  }
  return null
}

const Element = styled.div`
  margin-left: 8px;
  font-size: 14px;
  color: ${Colors.Text2};
`
