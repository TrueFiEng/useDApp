import React from 'react'
import styled from 'styled-components'
import { useAbi } from '../../../../hooks'
import { Property, Row, Table, Value } from './Table'
import { ValueItem, ValueList } from './ValueList'

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
  const selector = getSelector(call.data)
  const { name, parseCallData, parseCallResult } = useAbi(selector)

  return (
    <SmallTable>
      <Row>
        <Property>Contract</Property>
        <Value>{call.address}</Value>
      </Row>
      <Row>
        <Property>Method</Property>
        <Value>
          <FunctionName>{name}</FunctionName> (
          <ValueList values={parseCallData(call.data)} />)
        </Value>
      </Row>
      {call.value && (
        <Row>
          <Property>Result</Property>
          <Value>
            <ValueItem value={parseCallResult(call.value)} />
          </Value>
        </Row>
      )}
      {showDiff && (
        <Row>
          <Property>Previous</Property>
          <Value>
            {!call.previous && 'No value'}
            {call.previous && <ValueItem value={parseCallResult(call.previous)} />}
          </Value>
        </Row>
      )}
      {showDiff && (
        <Row>
          <Property>Current</Property>
          <Value>
            {!call.current && 'No value'}
            {call.current && <ValueItem value={parseCallResult(call.current)} />}
          </Value>
        </Row>
      )}
    </SmallTable>
  )
}

function getSelector(data: string) {
  if (data.startsWith('0x')) {
    return data.substring(2, 10)
  } else {
    return data.substring(2, 8)
  }
}

const FunctionName = styled.span``

const SmallTable = styled(Table)`
  line-height: 1.15;
`
