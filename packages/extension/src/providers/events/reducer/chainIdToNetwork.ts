export function chainIdToNetwork(chainId: number) {
  switch (chainId) {
    case 1:
      return 'Mainnet'
    case 3:
      return 'Ropsten'
    case 4:
      return 'Rinkeby'
    case 5:
      return 'Goerli'
    case 42:
      return 'Kovan'
    case 100:
      return 'xDai'
    case 1337:
      return 'Localhost'
    case 31337:
      return 'Hardhat'
    default:
      return chainId.toString()
  }
}
