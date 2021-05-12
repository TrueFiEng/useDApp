import React from 'react'
import styled from 'styled-components'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Address } from './Address'
import { Table } from './Table'
import { Property } from './Property'
import { ValueItem } from './ValueItem'
import { Method } from './Method'

interface Props {
  name: string
  address: string
  network: string | undefined
  data: ParsedValue[]
  value: ParsedValue | undefined
  previous: ParsedValue | undefined
  current: ParsedValue | undefined
}

export function CallDisplay(props: Props) {
  const showDiff = !!props.previous || !!props.current
  return (
    <SmallTable>
      <Property name="Contract">
        <Address address={props.address} network={props.network} />
      </Property>
      <Property name="Method">
        <Method name={props.name} args={props.data} network={props.network} />
      </Property>
      {props.value && (
        <Property name="Result">
          <ValueItem value={props.value} network={props.network} />
        </Property>
      )}
      {showDiff && (
        <Property name="Previous">
          <ValueItem value={props.previous} network={props.network} />
        </Property>
      )}
      {showDiff && (
        <Property name="Current">
          <ValueItem value={props.current} network={props.network} />
        </Property>
      )}
    </SmallTable>
  )
}

const SmallTable = styled(Table)`
  position: relative;
  line-height: 1.25;
`
