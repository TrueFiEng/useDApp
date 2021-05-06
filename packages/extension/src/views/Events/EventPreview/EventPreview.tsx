import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { EventItem } from '../EventItem/EventItem'
import { InitializedPreview } from './InitializedPreview'
import { NetworkConnectedPreview } from './NetworkConnectedPreview'
import { NetworkDisconnectedPreview } from './NetworkDisconnectedPreview'

interface Props {
  event?: Event
}

export function EventPreview({ event }: Props) {
  if (!event) {
    return null
  }

  return (
    <Wrapper>
      <EventItem event={event} />
      <Preview>
        {event.type === 'INIT' && <InitializedPreview />}
        {event.type === 'NETWORK_CONNECTED' && <NetworkConnectedPreview event={event} />}
        {event.type === 'NETWORK_DISCONNECTED' && <NetworkDisconnectedPreview />}
      </Preview>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 43px;
  left: 450px;
  width: calc(100% - 450px);
  height: calc(100% - 43px);
  padding: 10px;
  border-left: 1px solid ${Colors.Border2};
`

const Preview = styled.div`
  margin-top: 16px;
  line-height: 1.5;
`
