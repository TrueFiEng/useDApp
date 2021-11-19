import { useEffect, useState } from 'react'
import axios from 'axios'
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
    axios
      .get(tokenListURI)
      .then((response) => {
        const { name, logoURI, tokens } = response.data
        setTokenList({
          name,
          logoURI,
          tokens: (tokens as TokenInfo[]).filter((token) => token.chainId === chainId),
        })
      })
      .catch((err) => {
        console.log(err)
        setTokenList(undefined)
      })
  }, [tokenListURI, chainId])

  return tokenList
}
