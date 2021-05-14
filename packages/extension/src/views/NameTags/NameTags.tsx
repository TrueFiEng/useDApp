import React from 'react'
import { Page } from '../shared'

interface Props {
  onNavigate: (page: string) => void
}

export function NameTags({ onNavigate }: Props) {
  return (
    <Page name="nameTags" onNavigate={onNavigate}>
      Name Tags
    </Page>
  )
}
