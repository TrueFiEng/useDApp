import React from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

interface TableProps {
  className?: string
  children: ReactNode
}

export function Table({ className, children }: TableProps) {
  return (
    <TableComponent className={className}>
      <tbody>{children}</tbody>
    </TableComponent>
  )
}

const TableComponent = styled.table`
  display: block;
  border-collapse: collapse;
`
