import React, { useState } from 'react'
import {
  Handshaking,
  Sidebar,
  SidebarContainer,
  SidebarLinkDescription,
  SidebarLink,
  SidebarNav,
  SidebarNavLinks,
  SidebarMenuIconContainer,
  MenuIconContainer,
  ToMain,
  ToMainBottom,
} from './base/base'
import { MenuIcon } from './base/MenuIcon'

export function NavBar() {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <Sidebar showSidebar={showSidebar}>
      <SidebarContainer>
        <SidebarNav>
          <SidebarMenuIconContainer showSidebar={showSidebar}>
            <MenuIconContainer onClick={() => setShowSidebar(!showSidebar)}>
              <MenuIcon />
            </MenuIconContainer>
          </SidebarMenuIconContainer>
          <ToMain href="/">
            <span>useDapp</span>
            <ToMainBottom>
              Ethereum <Handshaking>🤝</Handshaking> React
            </ToMainBottom>
          </ToMain>
          <SidebarNavLinks>
            <SidebarLink activeClassName="active-page" to="/balance">
              {' '}
              Balance{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/prices">
              {' '}
              Prices{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/ens">
              {' '}
              ENS{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/block">
              {' '}
              Block{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/tokens">
              {' '}
              Tokens{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/send">
              {' '}
              Send Ether{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/transactions">
              {' '}
              Transactions{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/web3modal">
              {' '}
              Web3 Modal{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/web3react">
              {' '}
              Web3 React
              <br />
              Connector{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/multichain">
              {' '}
              Multichain
              <br /> <SidebarLinkDescription>&nbsp;experimental</SidebarLinkDescription>
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/wallet-connect">
              {' '}
              WalletConnect example{' '}
            </SidebarLink>
            <SidebarLink activeClassName="active-page" to="/connectors">
              {' '}
              Connectors{' '}
            </SidebarLink>
          </SidebarNavLinks>
        </SidebarNav>
      </SidebarContainer>
    </Sidebar>
  )
}
