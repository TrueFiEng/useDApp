import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BorderRad, Colors, Gradients, Shadows, Transitions } from '../../global/styles'
import { Title } from '../../typography/Title'

export const Page = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  padding-left: 14px;
  padding-right: 14px;
`

export const SidebarContainer = styled(Container)`
  max-width: 1200px;
`

export const MainContent = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
    background-image: ${Gradients.bodyBackground};
  }
`

export const Section = styled.section`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 24px;
  margin-bottom: 60px;
`

export const SectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;

  ${Title} {
    margin-bottom: 0;
  }
`

export const ContentRow = styled.div`
  display: block;

  & + & {
    margin-top: 16px;
  }
`

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${Colors.White};
  border-radius: ${BorderRad.s};
  box-shadow: ${Shadows.main};
  padding: 32px 32px;
`

export const Sidebar = styled.header`
  display: flex;
  position: fixed;
  left: 0;
  align-items: center;
  height: 100%;
  background-color: ${Colors.White};
  box-shadow: ${Shadows.main};
  z-index: 100;
`

export const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
`

export const ToMain = styled.a`
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

export const ToMainBottom = styled.span`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  align-items: center;
  width: fit-content;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
`

export const Handshaking = styled.span`
  letter-spacing: -0.3em;
`

export const SidebarNavLinks = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`
export const SidebarLink = styled(NavLink)`
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

export const SidebarLinkDescription = styled.span`
  display: contents;
  color: ${Colors.Gray[600]};
  font-size: 10px;
  text-transform: none;
`
