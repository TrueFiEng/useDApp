import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress, ChainId } from '@usedapp/core'
import { Button } from '../base/Button'
import { Colors } from '../../global/styles'
import styled from 'styled-components'

import { AccountModal } from './AccountModal'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const NETWORK_CONNECTIONS = {
  [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
  [ChainId.Ropsten]: 'https://ropsten.infura.io/v3/d8df2cb7844e4a54ab0a782f608749dd',
  [ChainId.Localhost]: 'http://127.0.0.1:8545',
}

export const Web3ReactConnectorButton = () => {
  const { account, activate, deactivate } = useEthers()
  const { ens } = useLookupAddress(account)
  const [showModal, setShowModal] = useState(false)
  const [activateError, setActivateError] = useState('')
  const { error } = useEthers()
  useEffect(() => {
    if (error && account) {
      setActivateError(error.message)
      return
    }
    setActivateError('')
  }, [error, account])

  const activateProvider = async () => {
    const web3Connector = new WalletConnectConnector({
      rpc: NETWORK_CONNECTIONS,
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
    })
    await activate(web3Connector)
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
        <LoginButton onClick={activateProvider}>Connect</LoginButton>
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
