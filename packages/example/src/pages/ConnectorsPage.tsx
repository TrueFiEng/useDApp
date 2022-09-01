import React from 'react'
import { Container, MainContent, Section } from '../components/base/base'
import { SingleConnector } from '../components/connectors/SingleConnector'
import { useConfig } from '@usedapp/core'

export const ConnectorPage = () => {
  const { connectors } = useConfig()

  return (
    <>
      <MainContent>
        <Container>
          <Section>
            {Object.entries(connectors).map(([name, connector]) => (
              <SingleConnector key={name} name={name} connector={connector} />
            ))}
          </Section>
        </Container>
      </MainContent>
    </>
  )
}
