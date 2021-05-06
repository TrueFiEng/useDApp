import React from 'react'
import styled from 'styled-components'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Property, Row, Table, Value } from './Table'

interface Props {
  values: ParsedValue[]
}

export function ValueList({ values }: Props) {
  return (
    <PaddedTable>
      {values.map((v, i) => (
        <Row key={i}>
          <Property>{v.name}</Property>
          <Value>
            <ValueItem value={v} />
          </Value>
        </Row>
      ))}
    </PaddedTable>
  )
}

const PaddedTable = styled(Table)`
  padding-left: 2ch;
`

export function ValueItem({ value }: { value: ParsedValue }) {
  if (value.type === 'address' || value.type === 'number' || value.type === 'bytes') {
    return <>{value.value}</>
  } else if (value.type === 'string') {
    return <>{JSON.stringify(value.value)}</>
  } else if (value.type === 'boolean') {
    return <>{value.value ? 'true' : 'false'}</>
  }
  return null
}
