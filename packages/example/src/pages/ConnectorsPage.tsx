import React, { useMemo } from 'react'
import { Container, MainContent, Section } from '../components/base/base'
import { SingleConnector } from '../components/connectors/SingleConnector'
import { MetamaskConnector } from '@usedapp/core/dist/esm/src/providers/network/connectors/implementations/metamask'
import { WalletConnectConnector } from '@usedapp/core/dist/esm/src/providers/network/connectors/implementations/walletconnect'
import { CoinbaseWalletConnector } from '@usedapp/core/dist/esm/src/providers/network/connectors/implementations/conibaseWallet'
import { InjectedConnector } from '@usedapp/core/dist/esm/src/providers/network/connectors/implementations/injected'
import { PortisConnector } from '@usedapp/core/dist/esm/src/providers/network/connectors/implementations/portis'
import { Connector } from '@usedapp/core'

const PORTIS_DAPP_ID = 'e36dbbe4-d25d-4db2-bfa8-cb80eb87d1f0'

export const ConnectorPage = () => {
  const connectors: Record<string, Connector> = useMemo(() => ({
    Metamask: new MetamaskConnector(),
    WalletConnect: new WalletConnectConnector({ infuraId: 'd8df2cb7844e4a54ab0a782f608749dd' }),
    Coinbase: new CoinbaseWalletConnector('useDapp example', 'd8df2cb7844e4a54ab0a782f608749dd'),
    Portis: new PortisConnector(PORTIS_DAPP_ID, 'mainnet', 1),
}), [])

  return (
    <>
      <MainContent>
        <Container>
          <Section>
            {Object.entries(connectors).map(([name, connector]) => <SingleConnector key={name} name={name} connector={connector} />)}
          </Section>
        </Container>
      </MainContent>
    </>
  )
}
