import React from 'react'
import {
  MetamaskConnector,
  WalletConnectConnector,
  CoinbaseWalletConnector,
  PortisConnector,
  FortmaticConnector,
  TorusConnector
} from '@usedapp/core'
import { Container, MainContent, Section } from '../components/base/base'
import { SingleConnector } from '../components/connectors/SingleConnector'

export const ConnectorPage = () => {

  return (
    <>
      <MainContent>
        <Container>
          <Section>
            <SingleConnector name='Metamask' connectorClass={MetamaskConnector}/>
            <SingleConnector name='WalletConnect' connectorClass={WalletConnectConnector}/>
            <SingleConnector name='Coinbase' connectorClass={CoinbaseWalletConnector}/>
            <SingleConnector name='Portis' connectorClass={PortisConnector}/>
            <SingleConnector name='Fortmatic' connectorClass={FortmaticConnector}/>
            <SingleConnector name='Torus' connectorClass={TorusConnector}/>
          </Section>
        </Container>
      </MainContent>
    </>
  )
}
