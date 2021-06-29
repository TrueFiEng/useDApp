import React from 'react'
import type { ErrorEvent } from '../../../providers/events/State'
import { Link } from './components'
import { Text, Title } from '../../shared'

interface Props {
  event: ErrorEvent
}

export function ErrorPreview({ event }: Props) {
  return (
    <>
      <Text>
        An error happened and was picked up by web3-react (which useDApp uses under the hood). Learn more about why this
        happens in{' '}
        <Link href="https://github.com/NoahZinsmeister/web3-react/tree/v6/docs#understanding-error-bubbling">
          web3-react docs
        </Link>
        .
      </Text>
      <Title>Error message:</Title>
      <Text>{event.error}</Text>
    </>
  )
}
