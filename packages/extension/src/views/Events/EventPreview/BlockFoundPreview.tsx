import React from 'react'
import type { BlockFoundEvent } from '../../../providers/events/State'
import { Text } from '../../shared'
import { formatInteger } from '../EventItem/formatInteger'
import { Link, Property, Table } from './components'

interface Props {
  event: BlockFoundEvent
}

export function BlockFoundPreview({ event }: Props) {
  const link = getExplorerLink(event.network, event.blockNumber)

  return (
    <>
      <Text>
        A new block has been found. Each new block will trigger a call to the blockchain that will refresh the state.
      </Text>
      <Table>
        <Property name="Height">{formatInteger(event.blockNumber)}</Property>
        <Property name="Network">{event.network}</Property>
        {link && (
          <Property name="Explore">
            <Link href={link} />
          </Property>
        )}
      </Table>
    </>
  )
}

function getExplorerLink(network: string, blockNumber: number) {
  switch (network) {
    case 'Mainnet':
      return `https://etherscan.io/block/${blockNumber}`
    case 'Ropsten':
      return `https://ropsten.etherscan.io/block/${blockNumber}`
    case 'Rinkeby':
      return `https://rinkeby.etherscan.io/block/${blockNumber}`
    case 'Goerli':
      return `https://goerli.etherscan.io/block/${blockNumber}`
    case 'Kovan':
      return `https://kovan.etherscan.io/block/${blockNumber}`
    case 'xDai':
      return `https://blockscout.com/xdai/mainnet/blocks/${blockNumber}/transactions`
  }
}
