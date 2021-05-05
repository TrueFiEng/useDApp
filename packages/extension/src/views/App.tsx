import React, { useContext } from 'react'
import styled from 'styled-components'
import { EventContext } from '../providers/events/EventProvider'
import { EventList } from './EventList'

export function App() {
  const events = useContext(EventContext)

  return (
    <Container>
      <EventList events={events} />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`
