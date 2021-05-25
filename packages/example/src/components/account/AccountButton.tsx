import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress } from '@usedapp/core'
import { Button } from '../base/Button'
import { Colors } from '../../global/styles'
import styled from 'styled-components'

import { AccountModal } from './AccountModal'

export const AccountButton = () => {
  const { account, deactivate, activateBrowserWallet, error } = useEthers()
  const [showModal, setShowModal] = useState(false)
  const [activateError, setActivateError] = useState('')

  useEffect(() => {
    if (error) {
      setActivateError(error.message)
    }
  }, [error])

  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }

  return (
    <Account>
      <ErrorWrapper>{activateError}</ErrorWrapper>
      {showModal && <AccountModal setShowModal={setShowModal} />}
      {account ? (
        <Account>
          <AccountLabel onClick={() => setShowModal(!showModal)}>{shortenAddress(account)}</AccountLabel>
          <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
        </Account>
      ) : (
        <LoginButton onClick={activate}>Connect</LoginButton>
      )}
    </Account>
  )
}

const ErrorWrapper = styled.div`
  color: red;
  margin-right: 40px;
  margin-left: 40px;
  overflow: auto;
`

const Account = styled.div`
  display: flex;
  align-items: center;
`

const LoginButton = styled(Button)`
  float: right;
  background-color: ${Colors.Yellow[100]};
`

const AccountLabel = styled.div`
  float: left;

  border: 1px solid black;
  margin: 10px;
  margin-right: -40px;
  padding: 7px;
  padding-right: 40px;
  display: flex;

  background-color: ${Colors.Yellow[200]};
  border-radius: 20px;
  &:hover {
    background-color: black;
    color: ${Colors.Yellow[100]};
  }
`
