import React from 'react'
import styled from 'styled-components'
import { Colors } from '../../../../design'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Address } from './Address'
import { Table } from './Table'
import { Property } from './Property'
import { ValueItem } from './ValueItem'
import { Method } from './Method'

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
