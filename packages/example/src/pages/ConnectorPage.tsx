import React from 'react'
import { MetamaskConnector, InjectedConnector } from '@usedapp/core'
import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import { CoinbaseWalletConnector } from '@usedapp/coinbase-connector'
import { PortisConnector } from '@usedapp/portis-connector'
import { Container, MainContent, Section } from '../components/base/base'
import { SingleConnector } from '../components/connectors/SingleConnector'

export const ConnectorPage = () => {
  return (
    <>
      <MainContent>
        <Container>
          <Section>
            <SingleConnector name="Metamask" connectorClass={MetamaskConnector} />
            <SingleConnector name="WalletConnect" connectorClass={WalletConnectConnector} />
            <SingleConnector name="Coinbase" connectorClass={CoinbaseWalletConnector} />
            <SingleConnector name="Injected" connectorClass={InjectedConnector} />
            <SingleConnector name="Portis" connectorClass={PortisConnector} />
          </Section>
        </Container>
      </MainContent>
    </>
  )
}
