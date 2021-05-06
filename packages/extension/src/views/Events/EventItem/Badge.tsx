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
    return <BlockNumber>{formatInteger(event.blockNumber)}</BlockNumber>
  } else if (event.type === 'NETWORK_CONNECTED') {
    const networkColor = getNetworkColor(event)
    return <NetworkBadge style={{ backgroundColor: networkColor }}>{event.network}</NetworkBadge>
  } else if (event.type === 'CALLS_UPDATED') {
    return (
      <>
        {event.addedCalls.length > 0 && <Added>+{event.addedCalls.length}</Added>}
        {event.removedCalls.length > 0 && <Removed>-{event.removedCalls.length}</Removed>}
      </>
    )
  } else if (event.type === 'STATE_UPDATED') {
    return <Updated>{event.updated.length}</Updated>
  }
  return null
}

const BlockNumber = styled.div`
  font-weight: bold;
  margin-right: 8px;
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

const Updated = styled.div`
  font-weight: bold;
  margin-right: 8px;
  color: ${Colors.Updated};
`
