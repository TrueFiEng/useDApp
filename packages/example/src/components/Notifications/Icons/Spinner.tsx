import styled from 'styled-components'

export const Spinner = styled.div`
  position: relative;
  display: inline-block;
  bottom: -0.1em;
  height: 1em;
  width: 1em;
  border-radius: 50%;
  border: 0.15em solid;
  margin-right: 10px;
  border-color: currentColor currentColor currentColor transparent;
  animation: spinner-spin 1s infinite linear;

  @keyframes spinner-spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
