import React from 'react'
import { useAbiParser } from '../../../../hooks'
import { CallDisplay } from './CallDisplay'

export interface GeneralizedCall {
  address: string
  data: string
  value?: string
  previous?: string
  current?: string
}

interface Props {
  call: GeneralizedCall
  network: string | undefined
}

export function Call({ call, network }: Props) {
  const selector = getSelector(call.data)
  const { name, parseCallData, parseCallResult } = useAbiParser(selector)

  return (
    <CallDisplay
      name={name}
      address={call.address}
      network={network}
      data={parseCallData(call.data)}
      value={call.value ? parseCallResult(call.value) : undefined}
      previous={call.previous ? parseCallResult(call.previous) : undefined}
      current={call.current ? parseCallResult(call.current) : undefined}
    />
  )
}

function getSelector(data: string) {
  if (data.startsWith('0x')) {
    return data.substring(2, 10)
  } else {
    return data.substring(2, 8)
  }
}
