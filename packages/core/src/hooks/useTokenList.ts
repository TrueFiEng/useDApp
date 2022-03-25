import { useEffect, useState } from 'react'
import { TokenInfo } from '@uniswap/token-lists'
import { useEthers } from './useEthers'

/**
 * @public
 */
export interface TokenList {
  name: string
  logoURI: string
  tokens: TokenInfo[]
}

/**
 * @public
 */
export function useTokenList(tokenListURI: string, overrideChainId?: number, tags?: string[]): TokenList | undefined {
  const { chainId: providerChainId } = useEthers()
  const [tokenList, setTokenList] = useState<TokenList>()

  const chainId = overrideChainId || providerChainId

  useEffect(() => {
    fetch(tokenListURI)
      .then(async (response) => {
        if (response.ok) {
          const { name, logoURI, tokens } = await response.json()
          setTokenList({
            name,
            logoURI,
            tokens: (tokens as TokenInfo[]).filter((token) => {
              const sameChainId = token.chainId === chainId
              if (!tags) {
                return sameChainId
              }
              return sameChainId && token.tags && token.tags.some((tag) => tags.includes(tag))
            }),
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
