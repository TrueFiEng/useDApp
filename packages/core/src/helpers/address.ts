import { getAddress } from 'ethers'
import { Falsy } from '../model/types'
import { shortenString } from './common'

/**
 * @public
 */
export function shortenAddress(address: string): string {
  try {
    const formattedAddress = getAddress(address)
    return shortenString(formattedAddress)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}

/**
 * @public
 */
export function shortenIfAddress(address: string | Falsy): string {
  if (typeof address === 'string' && address.length > 0) {
    return shortenAddress(address)
  }
  return ''
}

/**
 * @public
 */
export function compareAddress(firstAddress: string, secondAddress: string): number {
  try {
    const parsedFirstAddress = BigInt(firstAddress)
    const parsedSecondAddress = BigInt(secondAddress)

    if (parsedFirstAddress > parsedSecondAddress) {
      return 1
    }

    if (parsedFirstAddress < parsedSecondAddress) {
      return -1
    }

    return 0
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}

/**
 * @public
 */
export function addressEqual(firstAddress: string, secondAddress: string): boolean {
  try {
    return getAddress(firstAddress) === getAddress(secondAddress)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}
