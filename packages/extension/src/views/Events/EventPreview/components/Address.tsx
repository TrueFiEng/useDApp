import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import { getAddress } from '@ethersproject/address'

interface Props {
  address: string
  network: string | undefined
}

export function Address({ address, network }: Props) {
  const formatted = formatAddress(address)
  const url = getExplorerUrl(formatted, network)
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Shorten>{formatted.substring(0, 38)}</Shorten>
      <End>{formatted.substring(38)}</End>
    </Link>
  )
}

function formatAddress(address: string) {
  const lower = address.toLowerCase()
  try {
    return getAddress(lower)
  } catch {
    return lower
  }
}

const Link = styled.a`
  color: ${Colors.Link};
  font-family: ${Font.Code};
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
`

const Shorten = styled.span`
  display: inline-block;
  width: 7ch; // 0x 1234 ellipsis
  overflow: hidden;
  text-overflow: ellipsis;
`

const End = styled.span`
  display: inline-block;
  overflow: hidden;
`

function getExplorerUrl(address: string, network?: string) {
  switch (network) {
    case 'Mainnet':
      return `https://etherscan.io/address/${address}`
    case 'Ropsten':
      return `https://ropsten.etherscan.io/address/${address}`
    case 'Rinkeby':
      return `https://rinkeby.etherscan.io/address/${address}`
    case 'Goerli':
      return `https://goerli.etherscan.io/address/${address}`
    case 'Kovan':
      return `https://kovan.etherscan.io/address/${address}`
    case 'xDai':
      return `https://blockscout.com/xdai/mainnet/address/${address}/transactions`
  }
}
