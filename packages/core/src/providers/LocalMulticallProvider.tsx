import { ReactNode, useEffect, useState } from 'react'
import { isLocalChain } from '../helpers'
import { useEthers } from '../hooks'
import { useBlockNumber } from './blockNumber'
import { useConfig, useUpdateConfig } from './config'
import multicallABI from '../constants/abi/MultiCall.json'
import { deployContract } from '../helpers/contract'

interface LocalMulticallProps {
  children: ReactNode
}

enum LocalMulticallState {
  Unknown,
  NonLocal,
  Deploying,
  Deployed,
  Error,
}

export function LocalMulticallProvider({ children }: LocalMulticallProps) {
  const updateConfig = useUpdateConfig()
  const { multicallAddresses } = useConfig()
  const { library, chainId } = useEthers()
  const [localMulticallState, setLocalMulticallState] = useState(LocalMulticallState.Unknown)
  const [multicallBlockNumber, setMulticallBlockNumber] = useState<number>()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    if (!library || !chainId) {
      setLocalMulticallState(LocalMulticallState.Unknown)
      return
    }

    if (!isLocalChain(chainId)) {
      setLocalMulticallState(LocalMulticallState.NonLocal)
      return
    }

    if (multicallAddresses && multicallAddresses[chainId]) {
      setLocalMulticallState(LocalMulticallState.Deployed)
      return
    }

    if (localMulticallState === LocalMulticallState.Deploying) {
      return
    }

    const signer = library.getSigner()
    if (!signer) {
      setLocalMulticallState(LocalMulticallState.Error)
      return
    }

    setLocalMulticallState(LocalMulticallState.Deploying)

    const deployMulticall = async () => {
      try {
        const { contractAddress, blockNumber } = await deployContract(multicallABI, signer)
        console.log(`Deploying Multicall with contract address "${contractAddress}"`)

        updateConfig({ multicallAddresses: { [chainId]: contractAddress } })
        setMulticallBlockNumber(blockNumber)
        setLocalMulticallState(LocalMulticallState.Deployed)
      } catch {
        setLocalMulticallState(LocalMulticallState.Error)
      }
    }
    deployMulticall()
  }, [library, chainId])

  const awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber

  if (
    localMulticallState === LocalMulticallState.Deploying ||
    (localMulticallState === LocalMulticallState.Deployed && awaitingMulticallBlock)
  ) {
    return <div>Deploying multicall...</div>
  } else {
    return <>{children}</>
  }
}
