import { utils } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'

export function shortenAddress(address: string) {
  const formattedAddress = utils.getAddress(address)

  return formattedAddress.substring(0, 6) + '...' + formattedAddress.substring(formattedAddress.length - 4)
}

export function compareAddress(firstAddress: string, secondAddress: string) {
  const isGreater = BigNumber.from(firstAddress).gte(BigNumber.from(secondAddress))
  return isGreater ? 1 : -1
}
