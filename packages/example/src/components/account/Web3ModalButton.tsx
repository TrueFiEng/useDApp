import React, { useEffect, useState } from 'react'
import { useEthers, shortenAddress, useLookupAddress } from '@usedapp/core'
import { Button } from '../base/Button'
import { Colors } from '../../global/styles'
import styled from 'styled-components'
import { AccountModal } from './AccountModal'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import '@web3modal/ui'
import SignClient from '@walletconnect/sign-client'
import { ConfigCtrl, ModalCtrl } from '@web3modal/core'
import type { W3mModal } from '@web3modal/ui'

// 1. Get projectID at https://cloud.walletconnect.com
console.log('process.env.PUBLIC_PROJECT_ID', process.env.PUBLIC_PROJECT_ID)
if (!process.env.PUBLIC_PROJECT_ID) throw new Error('You need to provide PUBLIC_PROJECT_ID env variable')

// 2. Configure sign client
let signClient: SignClient | undefined = undefined
const namespaces = {
  eip155: {
    methods: ['eth_sign'],
    chains: ['eip155:1'],
    events: ['accountsChanged'],
  },
}

async function configureSignClient() {
  signClient = await SignClient.init({ projectId: process.env.PUBLIC_PROJECT_ID })
}

// 3. Configure web3modal
ConfigCtrl.setConfig({
  projectId: process.env.PUBLIC_PROJECT_ID,
  theme: 'light' as const,
  accentColor: 'orange' as const,
})

export const Web3ModalButton = () => {
  const [initializing, setInitializing] = useState(true)
  async function onOpenModal() {
    console.log('onOpenModal')
    if (signClient) {
      const { uri, approval } = await signClient.connect({ requiredNamespaces: namespaces })
      if (uri) {
        ModalCtrl.open({ uri, standaloneChains: namespaces.eip155.chains })
        await approval()
        ModalCtrl.close()
      }
    }
  }

  async function onInitialize() {
    await configureSignClient()
    setInitializing(false)
  }

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

  useEffect(() => {
    void onInitialize()
  }, [])

  const activateProvider = async () => {
    const web3Modal = new Web3Modal()
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  if (initializing) {
    return <div>Initializing...</div>
  }

  return (
    <Account>
      <LoginButton onClick={onOpenModal}>Connect</LoginButton>
      <w3m-modal></w3m-modal>
      {/* <ErrorWrapper>{activateError}</ErrorWrapper>
      {showModal && <AccountModal setShowModal={setShowModal} />}
      {account ? (
        <>
          <AccountLabel onClick={() => setShowModal(!showModal)}>{ens ?? shortenAddress(account)}</AccountLabel>
          <LoginButton onClick={() => deactivate()}>Disconnect</LoginButton>
        </>
      ) : (
        <LoginButton onClick={onOpenModal}>Connect</LoginButton>
      )} */}
    </Account>
  )
}

// 5. Let typescript know about custom w3m-modal dom / webcomponent element
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'w3m-modal': Partial<W3mModal>
    }
  }
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
