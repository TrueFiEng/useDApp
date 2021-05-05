import React, { useContext } from 'react'
import { EventContext } from './providers/EventProvider'

export function App() {
  const events = useContext(EventContext)

  return (
    <pre>
      <code>{JSON.stringify(events, null, 2)}</code>
    </pre>
  )
}
