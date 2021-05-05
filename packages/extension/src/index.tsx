import React from 'react'
import ReactDOM from 'react-dom'
import { Providers } from './providers/Providers'
import { App } from './views/App'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
)
