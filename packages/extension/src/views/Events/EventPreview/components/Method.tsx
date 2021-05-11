import React from 'react'
import styled from 'styled-components'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { ValueList } from './ValueList'

interface Props {
  name: string
  network: string | undefined
  args: ParsedValue[]
}

export function Method({ name, args, network }: Props) {
  return (
    <>
      <FunctionName>{name}</FunctionName> (
      <ValueList values={args} network={network} />)
    </>
  )
}

const FunctionName = styled.span``
