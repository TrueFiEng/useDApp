import React from 'react'
import type { NetworkConnectedEvent } from '../../../providers/events/State'
import { Text } from '../../shared'
import { Link, Property, Table } from './components'

interface Props {
  event: NetworkConnectedEvent
}

export function NetworkConnectedPreview({ event }: Props) {
  const explorer = getExplorer(event.network)

  return (
    <>
      <Text>
        useDApp has connected to a network. It will poll the network for new blocks, query the contract state and check
        transaction status.
      </Text>
      <Table>
        <Property name="Name">{event.network}</Property>
        <Property name="Type">{getNetworkType(event.network)}</Property>
        <Property name="Chain id">{event.chainId}</Property>
        {explorer && (
          <Property name="Explorer">
            <Link href={explorer} />
          </Property>
        )}
      </Table>
    </>
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
