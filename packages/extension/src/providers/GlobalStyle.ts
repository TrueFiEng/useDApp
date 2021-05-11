import { createGlobalStyle } from 'styled-components'
import { Colors, Font } from '../design'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: ${Font.Body};
    background-color: ${Colors.Background};
    color: ${Colors.Text};
    font-size: 16px;
    line-height: 1;
  }
`
