import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { GlobalStyles } from './GlobalStyles'
import { Providers } from '../providers/Providers'

ReactDOM.render(
  <>
    <Providers>
      <GlobalStyles />
      <App />
    </Providers>
  </>,
  document.getElementById('app')
)
