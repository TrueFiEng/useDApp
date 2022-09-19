import React from 'react';
import { Container, MainContent } from '../components/base/base'
import { ConnectButton } from '@usedapp/rainbowkit'

export function RainbowkitPage() {
  return (
    <MainContent>
      <Container>
        <ConnectButton />
      </Container>
    </MainContent>
  )
}
