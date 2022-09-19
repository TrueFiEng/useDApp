import React, { useState } from 'react'
import styled from 'styled-components'
import { toHttpPath } from '../../utils'
import { BorderRad } from '../../global/styles'

export function TokenIcon({ src, alt }: { src: string; alt: string }) {
  const [isIconError, setIconError] = useState(false)

  return (
    <>
      {isIconError ? (
        '🤷‍♂️'
      ) : (
        <Icon
          src={toHttpPath(src)}
          alt={alt}
          onError={() => {
            setIconError(true)
          }}
        />
      )}
    </>
  )
}

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: ${BorderRad.round};
  overflow: hidden;
`
