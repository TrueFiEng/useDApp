import React from 'react'
import { SidebarContainer } from '@usedapp/example'
import {
  Sidebar,
  SidebarLinkDescription,
  SidebarNav,
  SidebarNavLinks,
  ToMain,
  ToMainBottom,
  Handshaking,
} from '@usedapp/example'
import StyledLink from './StyledLink'

export function NavBar() {
  return (
    <Sidebar showSidebar>
      <SidebarContainer id="test">
        <SidebarNav>
          <ToMain href="/">
            <span>useDapp</span>
            <ToMainBottom>
              Ethereum <Handshaking>🤝</Handshaking> React
            </ToMainBottom>
          </ToMain>
          <SidebarNavLinks>
            <StyledLink href="/balance"> Balance </StyledLink>
            <StyledLink href="/prices"> Prices </StyledLink>
            <StyledLink href="/ens"> ENS </StyledLink>
            <StyledLink href="/block"> Block </StyledLink>
            <StyledLink href="/tokens"> Tokens </StyledLink>
            <StyledLink href="/send"> Send Ether </StyledLink>
            <StyledLink href="/transactions"> Transactions </StyledLink>
            <StyledLink href="/web3modal"> Web3 Modal </StyledLink>
            <StyledLink href="/web3react">
              <>
                {' '}
                Web3 React
                <br />
                Connector{' '}
              </>
            </StyledLink>
            <StyledLink href="/multichain">
              <>
                {' '}
                Multichain
                <br /> <SidebarLinkDescription>&nbsp;experimental</SidebarLinkDescription>
              </>
            </StyledLink>
            <StyledLink href="/wallet-connect"> WalletConnect example </StyledLink>
            <StyledLink href="/connectors">
              {' '}
              Connectors{' '}
            </StyledLink>
          </SidebarNavLinks>
        </SidebarNav>
      </SidebarContainer>
    </Sidebar>
  )
}
