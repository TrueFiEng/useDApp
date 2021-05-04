import React, { useEffect, useState } from 'react'
import { connect } from './connect'

export function App() {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const connection = connect()
    const stopListening = connection.listen((message) => {
      if (message.payload.type === 'REPLAY') {
        setMessages(message.payload.messages)
      } else {
        setMessages((messages) => [...messages, message])
      }
    })
    connection.init()
    return stopListening
  }, [])

  return (
    <pre>
      <code>{JSON.stringify(messages, null, 2)}</code>
    </pre>
  )
}
