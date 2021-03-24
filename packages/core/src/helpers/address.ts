import { utils } from 'ethers'
import { BigNumber } from '@ethersproject/bignumber'

export function shortenAddress(address: string): string {
  try {
    const formattedAddress = utils.getAddress(address)
    return formattedAddress.substring(0, 6) + '...' + formattedAddress.substring(formattedAddress.length - 4)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}

export function compareAddress(firstAddress: string, secondAddress: string) {
  const isGreater = BigNumber.from(firstAddress).gte(BigNumber.from(secondAddress))
  return isGreater ? 1 : -1
}

export function addressEqual(firstAddress: string, secondAddress: string) {
  return utils.getAddress(firstAddress) === utils.getAddress(secondAddress)
}
