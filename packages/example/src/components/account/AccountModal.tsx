import React from 'react'
import styled from 'styled-components'
import { useEthers, getExplorerAddressLink, useEtherBalance } from '@usedapp/core'
import { TransactionsList } from '../Transactions/History'
import { formatEther } from '@ethersproject/units'
import { BigNumber } from 'ethers'
import { Colors, Shadows } from '../../global/styles'
import { ShareIcon } from '../Transactions/Icons'

const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatBalance = (balance: BigNumber | undefined) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

export type AccountModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const AccountModal = ({ setShowModal }: AccountModalProps) => {
  const { account, chainId } = useEthers()
  const balance = useEtherBalance(account)
  if (account && chainId) {
    return (
      <ModalBackground onClick={() => setShowModal(false)}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <TitleRow>
            Account info
            <ClosingButton onClick={() => setShowModal(false)}>X</ClosingButton>
          </TitleRow>
          <AccountInfo>
            <AccountAddress>Address: {account}</AccountAddress>
            <LinkWrapper>
              <Link href={getExplorerAddressLink(account, chainId)} target="_blank" rel="noopener noreferrer">
                Show on etherscan
              </Link>
              <LinkIconWrapper>
                <ShareIcon />
              </LinkIconWrapper>
            </LinkWrapper>
            {window.isSecureContext && (
              <ClipboardCopy onClick={() => console.log(navigator.clipboard.writeText(account))}>
                Copy to clipboard
              </ClipboardCopy>
            )}
            <BalanceWrapper>ETH: {balance && formatBalance(balance)}</BalanceWrapper>
          </AccountInfo>
          <HistoryWrapper>
            <TransactionsList />
          </HistoryWrapper>
        </Modal>
      </ModalBackground>
    )
  } else {
    setShowModal(false)
    return <div />
  }
}

const ClipboardCopy = styled.button`
  float: right;
  font-size: 12px;
  text-decoration: underline;
  color: ${Colors.Gray['600']};
  margin-top: -13px;
`

const LinkWrapper = styled.div`
  display: flex;
  margin-left: 8px;
  align-items: center;
  margin-top: 20px;
`

const LinkIconWrapper = styled.div`
  width: 12px;
  height: 12px;
  margin-top: -5px;
  margin-left: 8px;
`

const BalanceWrapper = styled.div`
  margin: 10px;
`

const HistoryWrapper = styled.div``

const Link = styled.a`
  display: flex;
  font-size: 12px;
  text-decoration: underline;
  color: ${Colors.Gray['600']};
`

const AccountAddress = styled.p`
  font-weight: 10;
  margin-bottom: 10px;
  text-align: center;
`

const ClosingButton = styled.button`
  float: right;
  display: block;
  text-align: right;

  &:hover {
    color: grey;
  }
`

const TitleRow = styled.div`
  display: block;
  padding: 10px;
  width: 100%;
  text-align: righ;
  font-size: 20px;
`

const AccountInfo = styled.div`
  display: block;
  margin: 20px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: ${Shadows.main};
  background-color: ${Colors.White};
`

const Modal = styled.div`
  position: fixed;
  width: 600px;

  left: calc(50% - 300px);
  top: 100px;
  background-color: white;
  box-shadow: ${Shadows.main};
  border-radius: 10px;
  z-index: 3;
`

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0px;
  z-index: 2;
  background-color: rgba(235, 232, 223, 0.5);
`
