import React, { ReactNode } from 'react'
import { EventProvider } from './events/EventProvider'
import { GlobalStyle } from './GlobalStyle'

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <EventProvider>
      <GlobalStyle />
      {children}
    </EventProvider>
  )
}
