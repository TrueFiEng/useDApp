import React, { FormEvent, useState } from 'react'
import { Page } from '../Page'

interface Props {
  onNavigate: (page: string) => void
}

const PLACEHOLDER =
  'Paste ABI as JSON or solidity function signatures, one per line, e.g\n' +
  'function balanceOf(address owner) view returns (uint)\n' +
  'function allowance(address owner, address spender) view returns (uint)'

export function Abis({ onNavigate }: Props) {
  const [abis, setAbis] = useState<string[]>([])
  const [text, setText] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setAbis((abis) => [...abis, ...text.split('\n')])
    setText('')
  }

  return (
    <Page name="abis" onNavigate={onNavigate}>
      <form onSubmit={onSubmit}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={PLACEHOLDER} />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {abis.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ul>
    </Page>
  )
}
