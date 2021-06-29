import styled from 'styled-components'
import { BorderRad, Colors, Gradients, Shadows, Sizes } from '../../global/styles'
import { Title } from '../../typography/Title'

export const Page = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding-top: ${Sizes.headerHeight};
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

export const HeaderContainer = styled(Container)`
  max-width: 1200px;
`

export const MainContent = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - ${Sizes.headerHeight});
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
