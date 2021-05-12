import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../design'
import type { Event } from '../../../providers/events/State'
import { formatInteger } from './formatInteger'
import { getNetworkColor } from './getNetworkColor'

interface Props {
  event: Event
}

export function Badge({ event }: Props) {
  if (event.type === 'BLOCK_FOUND') {
    return <Bold>{formatInteger(event.blockNumber)}</Bold>
  } else if (event.type === 'NETWORK_CONNECTED') {
    const networkColor = getNetworkColor(event)
    return <NetworkBadge style={{ backgroundColor: networkColor }}>{event.network}</NetworkBadge>
  } else if (event.type === 'CALLS_UPDATED') {
    return (
      <>
        {event.added.length > 0 && <Added>+{event.added.length}</Added>}
        {event.removed.length > 0 && <Removed>-{event.removed.length}</Removed>}
      </>
    )
  } else if (event.type === 'STATE_UPDATED') {
    return <Bold>{event.updated.length}</Bold>
  } else if (event.type === 'ACCOUNT_CONNECTED') {
    return <Bold>{event.address.substring(0, 6)}&hellip;</Bold>
  } else if (event.type === 'ERROR' || event.type === 'FETCH_ERROR') {
    return <Error>Error:</Error>
  }
  return null
}

const Bold = styled.div`
  font-weight: bold;
  margin-right: 8px;
`

const Error = styled.div`
  font-weight: bold;
  margin-right: 8px;
  color: ${Colors.Error};
`

const NetworkBadge = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 4px 6px;
  margin-right: 8px;
  color: ${Colors.TextInverted};
  text-shadow: 0px 1px 2px black;
  border-radius: 4px;
`

const Added = styled.div`
  font-weight: bold;
  margin-right: 8px;
  color: ${Colors.Added};
`

const Removed = styled.div`
  font-weight: bold;
  margin-right: 8px;
  color: ${Colors.Removed};
  ${Added} + & {
    margin-left: -4px;
  }
`
