import { GlobalStyle, NotificationsList, Page } from '@usedapp/example'
import { ReactNode } from 'react'
import { NavBar } from '../components/NavBar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Page>
      <GlobalStyle />
      <NavBar />
      {children}
      <NotificationsList />
    </Page>
  )
}
