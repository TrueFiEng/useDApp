import React from 'react'
import { Page } from '../Page'

interface Props {
  onNavigate: (page: string) => void
}

export function Labels({ onNavigate }: Props) {
  return (
    <Page name="labels" onNavigate={onNavigate}>
      Labels
    </Page>
  )
}
