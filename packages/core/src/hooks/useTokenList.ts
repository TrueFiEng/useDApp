import { useEffect, useState } from 'react'
import axios from 'axios'
import { TokenInfo } from '@uniswap/token-lists'
import { ChainId } from '../constants'

interface TokenList {
  name: string
  logoURI: string
  tokens: TokenInfo[]
}

export function useTokenList(tokenListURI: string, chainId: ChainId = ChainId.Mainnet) {
  const [tokenList, setTokenList] = useState<TokenList>()

  useEffect(() => {
    axios
      .get(tokenListURI)
      .then(response => {
        const { name, logoURI, tokens } = response.data
        setTokenList({
          name,
          logoURI,
          tokens
        })
      })
      .catch(err => {
        console.log(err)
        setTokenList(undefined)
      })
  }, [tokenListURI, chainId])

  return tokenList
}
