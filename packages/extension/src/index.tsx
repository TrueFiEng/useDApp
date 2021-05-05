import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { EventProvider } from './providers/EventProvider'

ReactDOM.render(
  <React.StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
