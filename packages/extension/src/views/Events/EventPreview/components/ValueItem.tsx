import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { formatInteger } from '../../EventItem/formatInteger'
import { Address } from './Address'
import { Bytes } from './Bytes'
import { Tuple } from './Tuple'

interface Props {
  value: ParsedValue | undefined
  network: string | undefined
}

export function ValueItem({ value, network }: Props) {
  if (value === undefined) {
    return <NoValue>&lt;No value&gt;</NoValue>
  } else if (value.type === 'address') {
    return <Address address={value.value} network={network} />
  } else if (value.type === 'number') {
    return <Code>{formatInteger(value.value)}</Code>
  } else if (value.type === 'string') {
    return <Code>{JSON.stringify(value.value)}</Code>
  } else if (value.type === 'boolean') {
    return <Code>{value.value ? 'true' : 'false'}</Code>
  } else if (value.type === 'bytes') {
    return <Bytes value={value.value} />
  } else if (value.type === 'tuple') {
    return <Tuple items={value.value} network={network} />
  } else {
    return <Tuple isArray items={value.value} network={network} />
  }
}

const NoValue = styled.span`
  font-family: ${Font.Code};
  color: ${Colors.Text2};
`

const Code = styled.span`
  font-family: ${Font.Code};
`
