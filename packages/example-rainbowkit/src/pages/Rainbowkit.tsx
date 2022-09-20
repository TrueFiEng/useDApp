import React from 'react'
import { Container, MainContent } from '../components/base/base'
// import { ConnectButton } from '@usedapp/rainbowkit'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function RainbowkitPage() {
  return (
    <MainContent>
      <Container>
        <ConnectButton />
      </Container>
    </MainContent>
  )
}
