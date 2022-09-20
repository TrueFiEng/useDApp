import React from 'react'
import { Container, MainContent } from '../components/base/base'
import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from '@usedapp/rainbowkit'
import styled from 'styled-components'
import { Button } from '../components/base/Button';

// const Button = styled.button`
//   z-index: 100;
//   display: grid;
//   grid-auto-flow: column;
//   grid-column-gap: 8px;
//   align-items: center;
//   width: fit-content;
//   min-width: 160px;
//   height: 40px;
//   font-family: 'Roboto', sans-serif;
//   font-size: 14px;
//   line-height: 24px;
//   font-weight: 700;
//   text-transform: uppercase;
//   letter-spacing: 0.1em;
//   color: white;
//   padding: 5px;
//   border: 1px solid #ffffff;
//   border-radius: 14px;
//   background-color: blue;
// cursor: pointer;
//   // transition: background-color 0.2s ease-in-out;

//   &:hover,
//   &:focus {
//     background-color: #ffffff;
//     color: #000000;
//   }
// `
export function RainbowkitPage() {
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  return (
    <MainContent>
      <Container>
        <br />
        <ConnectButton />
        <br />
        {openConnectModal && (
          <Button onClick={openConnectModal} type="button">
            Open Connect Modal
          </Button>
        )}
        <br />
        {openAccountModal && (
          <Button onClick={openAccountModal} type="button">
            Open Account Modal
          </Button>
        )}
        <br />
        {openChainModal && (
          <Button onClick={openChainModal} type="button">
            Open Chain Modal
          </Button>
        )}
        <br />
      </Container>
    </MainContent>
  )
}
