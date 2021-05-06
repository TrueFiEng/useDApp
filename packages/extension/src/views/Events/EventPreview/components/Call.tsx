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
  const showDiff = !!call.previous || !!call.current
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
      {showDiff && (
        <Row>
          <Property>Previous</Property>
          <Value>{call.previous ?? 'No value'}</Value>
        </Row>
      )}
      {showDiff && (
        <Row>
          <Property>Current</Property>
          <Value>{call.current ?? 'No value'}</Value>
        </Row>
      )}
    </SmallTable>
  )
}

const SmallTable = styled(Table)`
  line-height: 1.15;
`
