import React from 'react'
import type { ChainId } from '@usedapp/core'
import { useBlockMeta, useChainMeta, useChainState, useEtherBalance, useEthers } from '@usedapp/core'
import { ContentBlock, ContentRow } from '../base/base'
import { Label } from '../../typography/Label'
import { TextInline } from '../../typography/Text'
import { formatEther } from '@ethersproject/units'
import styled from 'styled-components'

interface ChainStateProps {
  chainId: ChainId
}

export function ChainState({ chainId }: ChainStateProps) {
  const { chainName } = useChainMeta(chainId)
  const { value } = useChainState({ chainId }) ?? {}
  const { difficulty, timestamp } = useBlockMeta({ chainId })
  const { account } = useEthers()
  const balance = useEtherBalance(account, { chainId })
  return (
    <ChainBlock>
      <ContentRow>
        <Label>{chainName}</Label>
      </ContentRow>
      <ContentRow>
        <Label>Chain id:</Label> <TextInline>{chainId}</TextInline>
      </ContentRow>
      <ContentRow>
        <Label>Current block:</Label> <TextInline>{value?.blockNumber}</TextInline>
      </ContentRow>

      {difficulty && (
        <ContentRow>
          <Label>Current difficulty:</Label> <TextInline>{difficulty.toString()}</TextInline>
        </ContentRow>
      )}
      {timestamp && (
        <ContentRow>
          <Label>Current block timestamp:</Label> <TextInline>{timestamp.toLocaleString()}</TextInline>
        </ContentRow>
      )}
      {balance && (
        <ContentRow>
          <Label>Ether balance:</Label> <TextInline>{formatEther(balance)}</TextInline> <Label>ETH</Label>
        </ContentRow>
      )}
    </ChainBlock>
  )
}

const ChainBlock = styled(ContentBlock)`
  margin-right: 5px;
  margin-bottom: 5px;
  width: calc(50% - 5px);
  height: 260px;
`
