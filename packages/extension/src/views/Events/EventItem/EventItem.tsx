import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { Badge } from './Badge'
import { getEventLabel } from './getEventLabel'
import { getNetworkColor } from './getNetworkColor'
import { Latency } from './Latency'

interface Props {
  event: Event
}

export function EventItem({ event }: Props) {
  const networkColor = getNetworkColor(event)
  const showIndicator = networkColor && event.type !== 'NETWORK_CONNECTED' && event.type !== 'CALLS_UPDATED'
  return (
    <Wrapper>
      {showIndicator && <NetworkIndicator style={{ backgroundColor: networkColor }} />}
      <Badge event={event} />
      <Label>{getEventLabel(event)}</Label>
      <Latency event={event} />
      <Time>{event.time}</Time>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  width: 100%;
`

const Time = styled.div`
  flex: 1;
  text-align: right;
  color: ${Colors.Text2};
  font-size: 14px;
  margin-left: 8px;
`

const NetworkIndicator = styled.div`
  height: 20px;
  width: 8px;
  border-radius: 2px;
  margin-right: 8px;
`

const Label = styled.div`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
`
