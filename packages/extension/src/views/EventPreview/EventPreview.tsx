import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../design'
import type { Event } from '../../providers/events/State'

interface Props {
  event?: Event
}

export function EventPreview({ event }: Props) {
  if (!event) {
    return null
  }

  return (
    <Wrapper>
      <pre>
        <code>{JSON.stringify(event, null, 2)}</code>
      </pre>
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
