import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { InitializedPreview } from './InitializedPreview'
import { NetworkConnectedPreview } from './NetworkConnectedPreview'
import { NetworkDisconnectedPreview } from './NetworkDisconnectedPreview'
import { BlockFoundPreview } from './BlockFoundPreview'
import { CallsUpdatedPreview } from './CallsUpdatedPreview'
import { StateUpdatedPreview } from './StateUpdatedPreview'
import { FetchErrorPreview } from './FetchErrorPreview'
import { AccountConnectedPreview } from './AccountConnectedPreview'
import { AccountDisconnectedPreview } from './AccountDisconnectedPreview'
import { ErrorPreview } from './ErrorPreview'

interface Props {
  event?: Event
}

export function EventPreview({ event }: Props) {
  if (!event) {
    return <Center>Select an event from the list to get started.</Center>
  }

  return (
    <Wrapper>
      {event.type === 'INIT' && <InitializedPreview />}
      {event.type === 'NETWORK_CONNECTED' && <NetworkConnectedPreview event={event} />}
      {event.type === 'NETWORK_DISCONNECTED' && <NetworkDisconnectedPreview />}
      {event.type === 'ACCOUNT_CONNECTED' && <AccountConnectedPreview event={event} />}
      {event.type === 'ACCOUNT_DISCONNECTED' && <AccountDisconnectedPreview />}
      {event.type === 'BLOCK_FOUND' && <BlockFoundPreview event={event} />}
      {event.type === 'CALLS_UPDATED' && <CallsUpdatedPreview event={event} />}
      {event.type === 'STATE_UPDATED' && <StateUpdatedPreview event={event} />}
      {event.type === 'FETCH_ERROR' && <FetchErrorPreview event={event} />}
      {event.type === 'ERROR' && <ErrorPreview event={event} />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow: auto;
  position: absolute;
  top: 0;
  left: 320px;
  width: calc(100% - 320px);
  height: 100%;
  padding: 8px;
  border-left: 1px solid ${Colors.Border2};
  line-height: 1.5;
`

const Center = styled(Wrapper)`
  text-align: center;
`
