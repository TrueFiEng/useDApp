import { Balance } from './pages/Balance'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useBlockMeta, useBlockNumber, useEthers, useEtherBalance, ChainId, useTokenBalance } from '@usedapp/core'
import { Switch, Route, Redirect } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Tokens } from './pages/Tokens'
import { Block } from './pages/Block'
import { TopBar } from './components/TopBar'

const DAI_ADDRESSES = {
  [ChainId.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
  [ChainId.Ropsten]: '0xad6d458402f60fd3bd25163575031acdce07538d',
  [ChainId.Kovan]: '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
  [ChainId.Rinkeby]: '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658',
  [ChainId.Goerli]: '0x73967c6a0904aa032c103b4104747e88c566b1a2',
  [ChainId.xDai]: undefined
}

export function App() {
  const blockNumber = useBlockNumber()
  const { chainId, activateBrowserWallet, deactivate, account } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  const etherBalance = useEtherBalance(account)
  const daiBalance = useTokenBalance(account, chainId && DAI_ADDRESSES[chainId])

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
