import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { init } from './panel'

init()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
