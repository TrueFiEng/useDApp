import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Address } from './Address'
import { Property, Row, Table, Value } from './Table'
import { ValueList } from './ValueList'
import { ValueItem } from './ValueItem'

interface Props {
  type?: 'added' | 'removed' | 'updated' | 'persisted'
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
    <SmallTable className={props.type}>
      <Row>
        <Property>Contract</Property>
        <Value>
          <Address address={props.address} network={props.network} />
        </Value>
      </Row>
      <Row>
        <Property>Method</Property>
        <Value>
          <FunctionName>{props.name}</FunctionName> (
          <ValueList values={props.data} network={props.network} />)
        </Value>
      </Row>
      {props.value && (
        <Row>
          <Property>Result</Property>
          <Value>
            <ValueItem value={props.value} network={props.network} />
          </Value>
        </Row>
      )}
      {showDiff && (
        <Row>
          <Property>Previous</Property>
          <Value>
            {!props.previous && 'No value'}
            {props.previous && <ValueItem value={props.previous} network={props.network} />}
          </Value>
        </Row>
      )}
      {showDiff && (
        <Row>
          <Property>Current</Property>
          <Value>
            {!props.current && 'No value'}
            {props.current && <ValueItem value={props.current} network={props.network} />}
          </Value>
        </Row>
      )}
    </SmallTable>
  )
}

const FunctionName = styled.span``

const SmallTable = styled(Table)`
  position: relative;
  line-height: 1.25;
  user-select: text;

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
