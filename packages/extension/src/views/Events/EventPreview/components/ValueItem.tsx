import React from 'react'
import type { ParsedValue } from '../../../../providers/abi/ParsedValue'
import { Address } from './Address'

interface Props {
  value: ParsedValue | undefined
  network: string | undefined
}

export function ValueItem({ value, network }: Props) {
  if (value === undefined) {
    return <>No value</>
  } else if (value.type === 'address') {
    return <Address address={value.value} network={network} />
  } else if (value.type === 'number') {
    return <>{value.value}</>
  } else if (value.type === 'string') {
    return <>{JSON.stringify(value.value)}</>
  } else if (value.type === 'boolean') {
    return <>{value.value ? 'true' : 'false'}</>
  } else if (value.type === 'bytes') {
    return <Bytes value={value.value} />
  }
  return null
}

function Bytes({ value }: { value: string }) {
  const split = value.match(/.{1,32}/g) ?? []
  return (
    <>
      {split.map((x, i) => (
        <div key={i}>{x}</div>
      ))}
    </>
  )
}
