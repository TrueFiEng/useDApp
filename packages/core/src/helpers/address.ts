import { utils } from 'ethers'

export function shortenAddress(address: string) {
  const formattedAddress = utils.getAddress(address)

  return formattedAddress.substring(0, 6) + '...' + formattedAddress.substring(formattedAddress.length - 4)
}
