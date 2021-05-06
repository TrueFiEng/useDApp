import React, { ReactNode } from 'react'
import { EventProvider } from './events/EventProvider'
import { AbiProvider } from './abi/AbiProvider'
import { GlobalStyle } from './GlobalStyle'

interface Props {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <EventProvider>
      <AbiProvider>
        <GlobalStyle />
        {children}
      </AbiProvider>
    </EventProvider>
  )
}
