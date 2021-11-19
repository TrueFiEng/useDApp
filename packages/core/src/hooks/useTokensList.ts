import { useEffect, useState } from 'react'
import { TokenInfo } from '@uniswap/token-lists'
import { ChainId } from '../constants'
import { useEthers } from './useEthers'

interface TokensList {
  name: string
  logoURI: string
  tokens: TokenInfo[]
}

export function useTokensList(tokensListURI: string, overrideChainId?: ChainId) {
  const { chainId: providerChainId } = useEthers()
  const [tokensList, setTokensList] = useState<TokensList>()

  const chainId = overrideChainId || providerChainId

  useEffect(() => {
    fetch(tokensListURI)
      .then(async (response) => {
        if (response.ok) {
          const { name, logoURI, tokens } = await response.json()
          setTokensList({
            name,
            logoURI,
            tokens: (tokens as TokenInfo[]).filter((token) => token.chainId === chainId),
          })
        } else {
          const errorMessage = await response.text()
          return Promise.reject(new Error(errorMessage))
        }
      })
      .catch((err) => {
        console.log(err)
        setTokensList(undefined)
      })
  }, [tokensListURI, chainId])

  return tokensList
}
