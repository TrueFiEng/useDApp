import React, { useState } from 'react'
import { Abis } from './Abis/Abis'
import { Events } from './Events/Events'
import { Labels } from './Labels/Labels'

export function App() {
  const [page, setPage] = useState('events')
  if (page === 'events') {
    return <Events onNavigate={setPage} />
  } else if (page === 'abis') {
    return <Abis onNavigate={setPage} />
  } else if (page === 'labels') {
    return <Labels onNavigate={setPage} />
  }
  return null
}
