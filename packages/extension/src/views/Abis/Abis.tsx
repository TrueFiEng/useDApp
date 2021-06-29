import React, { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { Colors, Font } from '../../design'
import { useUserAbis } from '../../hooks'
import type { AbiEntry } from '../../providers/abi/AbiEntry'
import { DEFAULT_ENTRIES } from '../../providers/abi/AbiProvider'
import { Page, Text } from '../shared'
import { SubmitButton } from '../shared/SubmitButton'
import { parseAbiInput } from './parseAbiInput'

interface Props {
  onNavigate: (page: string) => void
}

const PLACEHOLDER =
  'Paste ABI as JSON or solidity function signatures, one per line, e.g:\n' +
  'function balanceOf(address owner) view returns (uint)\n' +
  'function allowance(address owner, address spender) view returns (uint)'

export function Abis({ onNavigate }: Props) {
  const [abis, setAbis] = useUserAbis()
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      const entries = parseAbiInput(text)
      if (entries.length > 0) {
        setAbis([...entries, ...abis])
      }
      setText('')
      setError('')
    } catch {
      setError('Cannot parse input data')
    }
  }

  function remove(i: number) {
    setAbis(abis.filter((x, index) => index !== i))
  }

  return (
    <Page name="abis" onNavigate={onNavigate}>
      <Wrapper>
        <Title>ABI Manager</Title>
        <Text>
          ABIs are used to parse call data. Adding ABIs from your contracts will allow you to easily inspect method
          calls that your application is making.
        </Text>
        <form onSubmit={onSubmit}>
          <TextArea value={text} onChange={(e) => setText(e.target.value)} placeholder={PLACEHOLDER} rows={6} />
          <Controls>
            <SubmitButton type="submit" value="Add ABIs" />
            <ErrorMessage>{error}</ErrorMessage>
          </Controls>
        </form>
        <AbiList>
          {getAbis(abis).map((entry, i) => (
            <AbiItem key={i} className={entry.disabled ? 'disabled' : ''}>
              <Signature className={entry.shadowed ? 'shadowed' : ''}>{entry.code}</Signature>
              {!entry.disabled && <Remove onClick={() => remove(i)}>Remove</Remove>}
            </AbiItem>
          ))}
        </AbiList>
      </Wrapper>
    </Page>
  )
}

function getAbis(userAbis: AbiEntry[]) {
  const builtIn = DEFAULT_ENTRIES.map((entry) => ({
    ...entry,
    disabled: true,
    shadowed: userAbis.some((x) => x.selector === entry.selector),
  }))
  const selectors = new Set<string>()
  return userAbis
    .map((entry) => {
      const shadowed = selectors.has(entry.selector)
      selectors.add(entry.selector)
      return { ...entry, shadowed, disabled: false }
    })
    .concat(builtIn)
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
  line-height: 1.5;
`

const Title = styled.p`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: bold;
`

const TextArea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  padding: 8px;
  border: 1px solid ${Colors.Border2};
  border-radius: 4px;
  font-family: ${Font.Code};
  font-size: inherit;
  line-height: 1.25;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

const ErrorMessage = styled.div`
  margin-left: 16px;
  color: ${Colors.Error};
`

const AbiList = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${Colors.Border};
  border-bottom: none;
  margin-bottom: 15px;
`

const AbiItem = styled.li`
  display: flex;
  align-items: center;
  border: 1px solid ${Colors.Background};
  border-bottom-color: ${Colors.Border};
  height: 32px;
  padding: 0 8px;

  &:hover {
    background-color: ${Colors.Hover};
  }

  &.disabled {
    background-color: ${Colors.Background2};
  }
`

const Signature = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${Font.Code};
  font-size: 14px;
  white-space: pre;

  &.shadowed {
    text-decoration: line-through;
  }
`

const Remove = styled.button`
  background: none;
  border: none;
  font-family: ${Font.Body};
  font-size: 14px;
  outline: none;
  color: ${Colors.Removed};
  cursor: pointer;
  padding: 0;
  margin-left: 8px;
`
