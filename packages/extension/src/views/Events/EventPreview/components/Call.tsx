import React from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../../../design'
import { useAbi } from '../../../../hooks'
import { Property, Row, Table, Value } from './Table'
import { ValueItem, ValueList } from './ValueList'

export interface GeneralizedCall {
  type?: 'added' | 'removed' | 'updated' | 'persisted'
  address: string
  data: string
  value?: string
  previous?: string
  current?: string
}

interface Props {
  call: GeneralizedCall
}

export function Call({ call }: Props) {
  const showDiff = !!call.previous || !!call.current
  const selector = getSelector(call.data)
  const { name, parseCallData, parseCallResult } = useAbi(selector)

  return (
    <SmallTable className={call.type}>
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
  position: relative;
  line-height: 1.15;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2ch;
    height: 100%;
  }

  &.added {
    padding-left: 1ch;
    &::before {
      background: linear-gradient(90deg, ${Colors.AddedHighlight} 20%, transparent 100%);
    }
  }

  &.removed {
    padding-left: 1ch;
    &::before {
      background: linear-gradient(90deg, ${Colors.RemovedHighlight} 20%, transparent 100%);
    }
  }

  &.updated {
    padding-left: 1ch;
    &::before {
      background: linear-gradient(90deg, ${Colors.UpdatedHighlight} 20%, transparent 100%);
    }
  }

  &.persisted {
    padding-left: 1ch;
    &::before {
      background: linear-gradient(90deg, ${Colors.PersistedHighlight} 20%, transparent 100%);
    }
  }
`
