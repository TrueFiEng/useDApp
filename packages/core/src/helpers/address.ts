import { utils } from 'ethers'
import { BigNumber } from 'ethers'
import { Falsy } from '../model/types'
import { shortenString } from './common'

/**
 * @public
 */
export function shortenAddress(address: string): string {
  try {
    const formattedAddress = utils.getAddress(address)
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
    const parsedFirstAddress = BigNumber.from(firstAddress)
    const parsedSecondAddress = BigNumber.from(secondAddress)

    if (parsedFirstAddress.gt(parsedSecondAddress)) {
      return 1
    }

    if (parsedFirstAddress.lt(parsedSecondAddress)) {
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
    return utils.getAddress(firstAddress) === utils.getAddress(secondAddress)
  } catch {
    throw new TypeError("Invalid input, address can't be parsed")
  }
}
