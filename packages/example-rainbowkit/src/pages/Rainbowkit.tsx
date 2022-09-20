import React from 'react'
import { Container, MainContent } from '../components/base/base'
import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from '@usedapp/rainbowkit'
import { Button } from '../components/base/Button';

export function RainbowkitPage() {
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  return (
    <MainContent>
      <Container>
        <br />
        <ConnectButton />
        <br />
        {openConnectModal && (
          <Button onClick={openConnectModal} type="button">
            Open Connect Modal
          </Button>
        )}
        <br />
        {openAccountModal && (
          <Button onClick={openAccountModal} type="button">
            Open Account Modal
          </Button>
        )}
        <br />
        {openChainModal && (
          <Button onClick={openChainModal} type="button">
            Open Chain Modal
          </Button>
        )}
        <br />
      </Container>
    </MainContent>
  )
}
