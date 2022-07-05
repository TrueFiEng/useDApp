import React from 'react'
import Link from 'next/link'
import { SidebarContainer } from '@usedapp/example'
import {
  Sidebar,
  // SidebarLinkDescription,
  SidebarlinkFactory,
  SidebarNav,
  SidebarNavLinks,
  ToMain,
  ToMainBottom,
  Handshaking,
} from '@usedapp/example'

export function NavBar() {
  return (
    <Sidebar>
      <SidebarContainer id="test">
        <SidebarNav>
          <ToMain href="/">
            <span>useDapp</span>
            <ToMainBottom>
              Ethereum <Handshaking>🤝</Handshaking> React
            </ToMainBottom>
          </ToMain>
          <SidebarNavLinks>
            <SidebarLink href="/balance"> Balance </SidebarLink>
            <SidebarLink href="/prices"> Prices </SidebarLink>
            <SidebarLink href="/ens"> ENS </SidebarLink>
            <SidebarLink href="/block"> Block </SidebarLink>
            <SidebarLink href="/tokens"> Tokens </SidebarLink>
            <SidebarLink href="/send"> Send Ether </SidebarLink>
            <SidebarLink href="/transactions"> Transactions </SidebarLink>
            <SidebarLink href="/web3modal"> Web3 Modal </SidebarLink>
            <SidebarLink href="/web3react">
              {/* <>
                {' '}
                Web3 React
                <br />
                Connector{' '}
              </> */}
              Web 3 React Connector
            </SidebarLink>
            <SidebarLink href="/multichain">
              {/* <>
                {' '}
                Multichain
                <br /> <SidebarLinkDescription>&nbsp;experimental</SidebarLinkDescription>
              </> */}
              Multichain
            </SidebarLink>
            <SidebarLink href="/wallet-connect"> WalletConnect example </SidebarLink>
          </SidebarNavLinks>
        </SidebarNav>
      </SidebarContainer>
    </Sidebar>
  )
}

const SidebarLink = SidebarlinkFactory(Link)
