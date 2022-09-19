import React, { useState } from 'react'
import { formatEther } from '@ethersproject/units'
import { Web3Provider } from '@ethersproject/providers'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { Container, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'
import { Button } from '../components/base/Button'
import WalletConnectProvider from '@walletconnect/web3-provider'

const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function WalletConnect() {
  const { account, activate, chainId, deactivate, library } = useEthers()
  const [signedMessage, setSignedMessage] = useState('')

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  async function onDisconnect() {
    deactivate()
    localStorage.removeItem('walletconnect')
    setSignedMessage('')
  }

  async function onSign() {
    const msg = 'I sign Wallet Connect test message on @usedapp'
    const provider = library as Web3Provider
    try {
      const signedMsg = await provider.getSigner().signMessage(msg)
      setSignedMessage(signedMsg)
    } catch (error) {
      console.error(error)
    }
  }

  const userBalance = useEtherBalance(account)
  const stakingBalance = useEtherBalance(STAKING_CONTRACT)

  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>WalletConnect Usage Example</Title>
            <Button onClick={account ? onDisconnect : onConnect}>{account ? 'Disconnect' : 'Connect'}</Button>
          </SectionRow>
          <ContentBlock>
            {chainId && account && (
              <ContentRow>
                <Label>Active Chain ID:</Label> <TextInline>{chainId}</TextInline>{' '}
              </ContentRow>
            )}
            {account && (
              <ContentRow>
                <Label>Account:</Label> <TextInline>{account}</TextInline>
              </ContentRow>
            )}
            {userBalance && (
              <ContentRow>
                <Label>Ether balance:</Label> <TextInline>{formatEther(userBalance)}</TextInline> <Label>ETH</Label>
              </ContentRow>
            )}
            {stakingBalance && (
              <ContentRow>
                <Label>ETH2 staking contract holds:</Label> <TextInline>{formatEther(stakingBalance)}</TextInline>{' '}
                <Label>ETH</Label>
              </ContentRow>
            )}
            {signedMessage && account && (
              <ContentRow>
                <Label>Signed message signature:</Label>{' '}
                <TextInline style={{ overflowWrap: 'break-word' }}>{signedMessage}</TextInline>{' '}
              </ContentRow>
            )}
          </ContentBlock>
          {account && (
            <SectionRow style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={onSign}>Sign message</Button>
            </SectionRow>
          )}
        </Section>
      </Container>
    </MainContent>
  )
}
