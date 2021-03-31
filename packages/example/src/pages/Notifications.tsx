import { useEthers } from '@usedapp/core'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { Button } from '../components/base/Button'

import { Title } from '../typography/Title'

export function Notifications() {
  const { activateBrowserWallet, deactivate, account } = useEthers()

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Notifications</Title>
            {account && <Button onClick={deactivate}>Disconnect</Button>}
            {!account && <Button onClick={activateBrowserWallet}>Connect</Button>}
          </SectionRow>
        </Section>
      </Container>
    </MainContent>
  )
}
