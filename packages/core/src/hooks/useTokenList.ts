import { useEffect, useState } from 'react'
import { TokenInfo } from '@uniswap/token-lists'
import { ChainId } from '../constants'
import { useEthers } from './useEthers'

interface TokenList {
  name: string
  logoURI: string
  tokens: TokenInfo[]
}

export function useTokenList(tokenListURI: string, overrideChainId?: ChainId) {
  const { chainId: providerChainId } = useEthers()
  const [tokenList, setTokenList] = useState<TokenList>()

  const chainId = overrideChainId || providerChainId

  useEffect(() => {
    fetch(tokenListURI)
      .then(async (response) => {
        if(response.ok) {
          const { name, logoURI, tokens } = await response.json()
          setTokenList({
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
        setTokenList(undefined)
      })
  }, [tokenListURI, chainId])

  return tokenList
}
