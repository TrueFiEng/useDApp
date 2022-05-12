import Jazzicon from '@metamask/jazzicon'
import { useEthers } from '@usedapp/core'
import React, { useEffect, useRef } from 'react'

export interface AccountIconProps {
    account?: string
}

export function AccountIcon({ account }: AccountIconProps) {
  const size = 20
  const borderRadius = '50%'

  const { account: walletAccount } = useEthers()
  const address = account ?? walletAccount
  
  const accountIconRef = useRef<any>(null)

  useEffect(() => {
    if (address && accountIconRef.current) {
      accountIconRef.current.innerHTML = ''
      accountIconRef.current.appendChild(Jazzicon(size, parseInt(address.slice(2, 10), 16)))
    }
  }, [address, accountIconRef, size])

  return <div ref={accountIconRef} style={{ borderRadius }} />
}
