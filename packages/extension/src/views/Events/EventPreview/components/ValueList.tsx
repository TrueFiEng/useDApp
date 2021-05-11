import React from 'react'
import styled from 'styled-components'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Table } from './Table'
import { Property } from './Property'
import { ValueItem } from './ValueItem'

interface Props {
  values: ParsedValue[]
  network: string | undefined
}

export function ValueList({ values, network }: Props) {
  return (
    <PaddedTable>
      {values.map((v, i) => (
        <Property key={i} name={v.name}>
          <ValueItem value={v} network={network} />
        </Property>
      ))}
    </PaddedTable>
  )
}

const PaddedTable = styled(Table)`
  padding-left: 4px;
`
