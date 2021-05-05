import React from 'react'
import styled from 'styled-components'
import { Colors } from '../design'
import type { Event } from '../providers/events/State'

interface Props {
  event: Event
}

export function EventListItem({ event }: Props) {
  const networkColor = getNetworkColor(event)
  return (
    <ListItem>
      <Time>{event.time}</Time>
      <NetworkIndicator style={{ backgroundColor: networkColor }} />
      <Badge event={event} />
      <Label>{getEventLabel(event)}</Label>
    </ListItem>
  )
}

function Badge({ event }: Props) {
  if (event.type === 'BLOCK_FOUND') {
    return <BlockNumber>{formatBlockNumber(event.blockNumber)}</BlockNumber>
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
  }
  return null
}

function getNetworkColor(event: Event) {
  if (event.type === 'INIT' || event.type === 'NETWORK_DISCONNECTED' || !event.network) {
    return 'transparent'
  }
  return (Colors.Network as any)[event.network] ?? Colors.Network.Other
}

function getEventLabel(event: Event) {
  switch (event.type) {
    case 'INIT':
      return 'Initialized'
    case 'BLOCK_FOUND':
      return 'Block found'
    case 'NETWORK_CONNECTED':
      return 'Network connected'
    case 'NETWORK_DISCONNECTED':
      return 'Network disconnected'
    case 'CALLS_UPDATED':
      return 'Calls updated'
    case 'STATE_UPDATED':
      return 'State updated'
    case 'FETCH_ERROR':
      return 'Fetch error'
  }
}

function formatBlockNumber(blockNumber: number) {
  const value = blockNumber.toString()
  const count = value.length / 3
  const resultValue = value.split('')
  for (let i = 1; i < count; i++) {
    resultValue.splice(-4 * i + 1, 0, ',')
  }
  return resultValue.join('')
}

const ListItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Colors.Border};
  cursor: pointer;

  &:hover {
    background-color: ${Colors.Hover};
  }
`

const Time = styled.div`
  color: ${Colors.Text2};
  font-size: 14px;
  margin-left: 8px;
`

const NetworkIndicator = styled.div`
  height: 32px;
  width: 6px;
  margin: 1px 8px 1px 8px;
`

const BlockNumber = styled.div`
  font-weight: bold;
  margin-right: 8px;
`

const NetworkBadge = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
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

const Label = styled.div``
