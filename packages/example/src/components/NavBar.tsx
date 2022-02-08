import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BorderRad, Colors, Shadows, Transitions } from '../global/styles'
import { HeaderContainer } from './base/base'

export function NavBar() {
  return (
    <Sidebar>
      <HeaderContainer>
        <SidebarNav>
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
          </SidebarNavLinks>
        </SidebarNav>
      </HeaderContainer>
    </Sidebar>
  )
}

const Sidebar = styled.header`
  display: flex;
  position: fixed;
  left: 0;
  align-items: center;
  height: 100%;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.main};
  z-index: 100;
`

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
`

const ToMain = styled.a`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-top: 16px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 700;
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Yellow[500]};
  }
`

const ToMainBottom = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
`

const Handshaking = styled.span`
  letter-spacing: -0.3em;
`

const SidebarNavLinks = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`

const SidebarLink = styled(NavLink)`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 16px;
  text-transform: uppercase;
  transition: ${Transitions.all};
  white-space: nowrap;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: calc(100% - 20px);
    height: 2px;
    background-color: ${Colors.Yellow[500]};
    transform: scaleX(0);
    transform-origin: 50% 50%;
    transition: ${Transitions.all};
  }

  &:hover {
    color: ${Colors.Yellow[500]};

    &:after {
      transform: scaleX(1);
    }
  }
  &.active-page {
    background: ${Colors.Yellow[200]};
    border-radius: ${BorderRad.s};

    &:after {
      transform: scaleX(1);
    }
  }
`

const SidebarLinkDescription = styled.span`
  display: contents;
  color: ${Colors.Gray[600]};
  font-size: 10px;
  text-transform: none;
`
