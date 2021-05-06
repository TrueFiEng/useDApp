import React from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'
import { Colors } from '../../../../design'

interface TableProps {
  className?: string
  children: ReactNode
}

export function Table({ className, children }: TableProps) {
  return (
    <table className={className}>
      <tbody>{children}</tbody>
    </table>
  )
}

export const Row = styled.tr``

export const Property = styled.td`
  text-align: right;
  font-size: 14px;
  padding-right: 8px;
  padding-top: 2px;
  vertical-align: baseline;
  color: ${Colors.Text2};
`

export const Value = styled.td`
  user-select: text;
`
