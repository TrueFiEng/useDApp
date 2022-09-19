import { createGlobalStyle } from 'styled-components'
import HelveticaNeue from '../assets/fonts/HelveticaNeue.woff2'
import HelveticaNeueBold from '../assets/fonts/HelveticaNeueBold.woff2'
import HelveticaNeueMedium from '../assets/fonts/HelveticaNeueMedium.woff2'
import { Colors, Fonts } from './styles'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeue}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: "HelveticaNeue";
    src: url(${HelveticaNeueBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.White};
    font-family: ${Fonts.Helvetica};
    font-size: 16px;
    color: ${Colors.Black[900]};
    overscroll-behavior-y: none;
  }
  
  button {
    font-family: ${Fonts.Helvetica};
    font-size: 1em;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${Colors.Black[900]};
    text-decoration: none;

    &:visited {
      color: ${Colors.Black[900]};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    line-height: 150%;
    font-weight: 600;
    font-family: ${Fonts.Helvetica};
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 24px;
  }
  
  h3 {
    font-size: 14px;
  }

  h4 {
    font-size: 12px;
  }

  p {
    margin: 0;
  }
`
