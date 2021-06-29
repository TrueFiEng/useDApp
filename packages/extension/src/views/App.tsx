import React, { useState } from 'react'
import { Abis } from './Abis/Abis'
import { Events } from './Events/Events'
import { NameTags } from './NameTags/NameTags'

export function App() {
  const [page, setPage] = useState('events')
  if (page === 'events') {
    return <Events onNavigate={setPage} />
  } else if (page === 'abis') {
    return <Abis onNavigate={setPage} />
  } else if (page === 'nameTags') {
    return <NameTags onNavigate={setPage} />
  }
  return null
}
