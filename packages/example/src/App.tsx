import { Redirect, Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Page } from './components/base/base'
import { TopBar } from './components/TopBar'
import { GlobalStyle } from './global/GlobalStyle'
import { Balance } from './pages/Balance'
import { Block } from './pages/Block'
import { Tokens } from './pages/Tokens'
import { Notifications } from './pages/Notifications'

export function App() {
  return (
    <Page>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar />
        <Switch>
          <Route exact path="/balance" component={Balance} />
          <Route exact path="/block" component={Block} />
          <Route exact path="/tokens" component={Tokens} />
          <Route exact path="/notifications" component={Notifications} />
          <Redirect exact from="/" to="/balance" />
        </Switch>
      </BrowserRouter>
    </Page>
  )
}
