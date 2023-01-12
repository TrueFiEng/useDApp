import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { NavBar } from './components/NavBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Balance } from './pages/Balance'
import { Prices } from './pages/Prices'
import { Block } from './pages/Block'
import { Tokens } from './pages/Tokens'
import { Transactions } from './pages/Transactions'
import { SendEtherPage } from './pages/SendEtherPage'
import { NotificationsList } from './components/Transactions/History'
import { Web3Modal } from './pages/Web3Modal'
import { Web3ReactConnector } from './pages/Web3ReactConnector'
import { Multichain } from './pages/Multichain'
import { WalletConnect } from './pages/WalletConnect'
import { ENSExample } from './components/ENS/ENSExample'
import { ConnectorPage } from './pages/ConnectorsPage'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/balance" component={Balance} />
          <Route exact path="/prices" component={Prices} />
          <Route exact path="/ens" component={ENSExample} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/tokens" component={Tokens} />
          <Route exact path="/send" component={SendEtherPage} />
          <Route exact path="/transactions" component={Transactions} />
          <Route exact path="/web3modal" component={Web3Modal} />
          <Route exact path="/web3react" component={Web3ReactConnector} />
          <Route exact path="/multichain" component={Multichain} />
          <Route exact path="/wallet-connect" component={WalletConnect} />
          <Route exact path="/connectors" component={ConnectorPage} />
          <Redirect exact from="/" to="/balance" />
        </Switch>
      </BrowserRouter>
      <NotificationsList />
    </Page>
  )
}
