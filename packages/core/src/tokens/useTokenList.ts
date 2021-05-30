import { useEffect, useState } from 'react'
import { ChainId } from '../constants'
import { Token } from '../model'
import { CurrencyFormatOptions } from '../model/formatting'

export function useTokenList(
  chainId: ChainId,
  tokenListUri?: string,
  formattingOptions: Partial<CurrencyFormatOptions> = {}
): Token[] | undefined {
  const [tokenList, setTokenList] = useState([])

  const _tokenListUri = tokenListUri || 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'
  useEffect(() => {
    const getTokenList = async () => {
      try {
        const tokenList = await fetch(_tokenListUri)
        const tokenListJson = await tokenList.json()
        let _tokenList

        if (chainId) {
          _tokenList = tokenListJson.tokens.filter((t: { chainId: ChainId }) => {
            return t.chainId === chainId
          })
        } else {
          _tokenList = tokenListJson
        }

        const tokens = _tokenList.tokens.forEach(
          (token: { name: string; symbol: string; address: string; decimals: number | undefined }) => {
            return new Token(token.name, token.symbol, chainId, token.address, token.decimals, formattingOptions)
          }
        )
        setTokenList(tokens)
      } catch (e) {
        console.log(e)
      }
    }
    getTokenList()
  }, [tokenListUri])

  return tokenList
}
