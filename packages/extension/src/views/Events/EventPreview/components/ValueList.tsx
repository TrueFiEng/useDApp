import React from 'react'
import styled from 'styled-components'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Property, Row, Table, Value } from './Table'
import { ValueItem } from './ValueItem'

interface Props {
  values: ParsedValue[]
  network: string | undefined
}

export function ValueList({ values, network }: Props) {
  return (
    <PaddedTable>
      {values.map((v, i) => (
        <Row key={i}>
          <Property>{v.name}</Property>
          <Value>
            <ValueItem value={v} network={network} />
          </Value>
        </Row>
      ))}
    </PaddedTable>
  )
}

const PaddedTable = styled(Table)`
  tbody {
    display: block;
    padding-left: 4px;
  }
`
