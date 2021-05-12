import React from 'react'
import { Page } from '../Page'

interface Props {
  onNavigate: (page: string) => void
}

export function Abis({ onNavigate }: Props) {
  return (
    <Page name="abis" onNavigate={onNavigate}>
      ABIs
    </Page>
  )
}
