import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { TopBar } from './components/TopBar'
import { Balance } from './pages/Balance'
import { Block } from './pages/Block'
import { Tokens } from './pages/Tokens'

export function App() {
  return (
    <Background>
      <Global />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/balance" component={Balance} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/tokens" component={Tokens} />
          <Redirect exact from="/" to="/balance" />
        </Switch>
      </BrowserRouter>
    </Background>
  )
}

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    overflow: auto;
  }
`

const Background = styled.div`
  background-color: #f3f4f9;
  overflow: auto;
  min-height: 100vh;
`
