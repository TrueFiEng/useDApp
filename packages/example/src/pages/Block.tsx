import React from 'react'
import { useBlockMeta, useBlockNumber, useEthers } from '@usedapp/core'

export function Block() {
  const blockNumber = useBlockNumber()
  const { chainId } = useEthers()
  const { timestamp, difficulty } = useBlockMeta()
  return (
    <div>
      <p>Chain id: {chainId}</p>
      <p>Current block: {blockNumber}</p>
      {difficulty && <p>Current difficulty: {difficulty.toString()}</p>}
      {timestamp && <p>Current block timestamp: {timestamp.toLocaleString()}</p>}
    </div>
  )
}
