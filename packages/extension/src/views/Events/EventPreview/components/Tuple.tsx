import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { ValueList } from './ValueList'

interface Props {
  network: string | undefined
  items: ParsedValue[]
}

export function Tuple({ items, network }: Props) {
  if (items.length === 0) {
    return (
      <Code>
        (<Comment>&lt;empty tuple&gt;</Comment>)
      </Code>
    )
  }
  return (
    <>
      <Code>(</Code>
      <ValueList values={items} network={network} />
      <Code>)</Code>
    </>
  )
}

const Code = styled.span`
  font-family: ${Font.Code};
`

const Comment = styled.span`
  color: ${Colors.Text2};
`
