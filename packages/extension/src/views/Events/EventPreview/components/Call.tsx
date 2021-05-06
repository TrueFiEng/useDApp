import React from 'react'
import styled from 'styled-components'
import { Property, Row, Table, Value } from './Table'

interface Props {
  call: {
    address: string
    data: string
    value?: string
    previous?: string
    current?: string
  }
}

export function Call({ call }: Props) {
  return (
    <SmallTable>
      <Row>
        <Property>Contract</Property>
        <Value>{call.address}</Value>
      </Row>
      <Row>
        <Property>Data</Property>
        <Value>{call.data}</Value>
      </Row>
      {call.value && (
        <Row>
          <Property>Result</Property>
          <Value>{call.value}</Value>
        </Row>
      )}
      {call.previous && (
        <Row>
          <Property>Previous</Property>
          <Value>{call.previous}</Value>
        </Row>
      )}
      {call.current && (
        <Row>
          <Property>Current</Property>
          <Value>{call.current}</Value>
        </Row>
      )}
    </SmallTable>
  )
}

const SmallTable = styled(Table)`
  line-height: 1.15;
`
