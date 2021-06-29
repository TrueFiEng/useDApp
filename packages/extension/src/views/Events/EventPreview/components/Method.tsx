import React from 'react'
import styled from 'styled-components'
import { Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { ValueList } from './ValueList'

interface Props {
  name: string
  network: string | undefined
  args: ParsedValue[]
}

export function Method({ name, args, network }: Props) {
  if (args.length === 0) {
    return <Code>{name}()</Code>
  }
  return (
    <>
      <Code>{name}(</Code>
      <ValueList values={args} network={network} />
      <Code>)</Code>
    </>
  )
}

const Code = styled.span`
  font-family: ${Font.Code};
`
