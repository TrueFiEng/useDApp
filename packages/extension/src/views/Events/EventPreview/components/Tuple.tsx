import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { ValueList } from './ValueList'

interface Props {
  network: string | undefined
  isArray?: boolean
  items: ParsedValue[]
}

export function Tuple({ items, isArray, network }: Props) {
  return (
    <>
      <Code>{isArray ? '[' : '{'}</Code>
      {items.length === 0 && <Comment>&lt;empty {isArray ? 'array' : 'tuple'}&gt;</Comment>}
      {items.length > 0 && <ValueList values={items} network={network} />}
      <Code>{isArray ? ']' : '}'}</Code>
    </>
  )
}

const Code = styled.span`
  font-family: ${Font.Code};
`

const Comment = styled.span`
  font-family: ${Font.Code};
  color: ${Colors.Text2};
`
