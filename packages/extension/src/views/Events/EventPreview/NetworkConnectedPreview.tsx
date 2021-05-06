import React from 'react'
import type { NetworkConnectedEvent } from '../../../providers/events/State'
import { Link, Property, Row, Table, Value } from './components'

interface Props {
  event: NetworkConnectedEvent
}

export function NetworkConnectedPreview({ event }: Props) {
  const explorer = getExplorer(event.network)

  return (
    <Table>
      <Row>
        <Property>Name</Property>
        <Value>{event.network}</Value>
      </Row>
      <Row>
        <Property>Type</Property>
        <Value>{getNetworkType(event.network)}</Value>
      </Row>
      <Row>
        <Property>Chain id</Property>
        <Value>{event.chainId}</Value>
      </Row>
      {explorer && (
        <Row>
          <Property>Explorer</Property>
          <Value>
            <Link href={explorer} />
          </Value>
        </Row>
      )}
    </Table>
  )
}

function getNetworkType(network: string) {
  switch (network) {
    case 'Mainnet':
      return 'Production'
    case 'Ropsten':
      return 'Testing'
    case 'Rinkeby':
      return 'Testing'
    case 'Goerli':
      return 'Testing'
    case 'Kovan':
      return 'Testing'
    case 'xDai':
      return 'Production'
    case 'Localhost':
      return 'Development'
    case 'Hardhat':
      return 'Development'
    default:
      return 'Unknown'
  }
}

function getExplorer(network: string) {
  switch (network) {
    case 'Mainnet':
      return 'https://etherscan.io/'
    case 'Ropsten':
      return 'https://ropsten.etherscan.io/'
    case 'Rinkeby':
      return 'https://rinkeby.etherscan.io/'
    case 'Goerli':
      return 'https://goerli.etherscan.io/'
    case 'Kovan':
      return 'https://kovan.etherscan.io/'
    case 'xDai':
      return 'https://blockscout.com/xdai/mainnet/'
  }
}
