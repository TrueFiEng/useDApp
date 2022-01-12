import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress, useConnectors } from '@usedapp/core'
import { Button } from '../base/Button'
import { Colors } from '../../global/styles'
import styled from 'styled-components'
import Web3Modal from 'web3modal'

import { AccountModal } from './AccountModal'
import { EIP1193 } from '@web3-react/eip1193'
import { initializeConnector } from '@web3-react/core'
import WalletConnectProvider from '@walletconnect/web3-provider'

export const AccountButton = () => {
  const { account, deactivate } = useEthers()
  const ens = useLookupAddress()
  const [showModal, setShowModal] = useState(false)
  const { setConnectors } = useConnectors()
  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser'
        },
        package: null
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: '14a0951f47e646c1b241aa533e150219'
        }
      }
    }

    const web3Modal = new Web3Modal({
      providerOptions
    })
    const provider = await web3Modal.connect()
    setConnectors([initializeConnector<EIP1193>((actions) => new EIP1193(actions, provider))])
  }

  return (
    <Account>
      <ErrorWrapper>{activateError}</ErrorWrapper>
      {showModal && <AccountModal setShowModal={setShowModal} />}
      {account ? (
        <>
          <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(account)}</AccountLabel>
          <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
        </>
      ) : (
        <LoginButton onClick={activate}>Connect</LoginButton>
      )}
    </Account>
  )
}

const ErrorWrapper = styled.div`
  color: #ff3960;
  margin-right: 40px;
  margin-left: 40px;
  overflow: auto;
`

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(Button)`
  background-color: ${Colors.Yellow[100]};
`

const AccountLabel = styled(Button)`
  height: 32px;
  margin-right: -40px;
  padding-right: 40px;
  padding-left: 8px;
  background-color: ${Colors.Yellow[100]};
  font-size: 12px;
`
