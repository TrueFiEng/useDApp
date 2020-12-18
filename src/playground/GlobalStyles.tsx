import { createGlobalStyle } from 'styled-components'

const Colors = {
  White: 'white',
}

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.White};
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
  }
`