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

export function LocalMulticallProvider({ children }: LocalMulticallProps) {
  const updateConfig = useUpdateConfig()
  const { multicallAddresses } = useConfig()
  const { library, chainId } = useEthers()
  const [isDeployingMulticall, setIsDeployingMulticall] = useState(false)
  const [multicallBlockNumber, setMulticallBlockNumber] = useState<number>()
  const blockNumber = useBlockNumber()

  const multicallAddress = chainId && multicallAddresses && multicallAddresses[chainId]

  useEffect(() => {
    if (isDeployingMulticall || multicallAddress || !library || !chainId) {
      return
    }

    const deployMulticall = async () => {
      const signer = library?.getSigner()
      if (!signer) {
        setIsDeployingMulticall(false)
        return
      }

      const { contractAddress, receipt } = await deployContract(multicallABI, signer)
      console.log(`Deploying Multicall with contract address "${contractAddress}"`)

      updateConfig({
        multicallAddresses: {
          [chainId]: contractAddress,
        },
      })
      setMulticallBlockNumber(receipt.blockNumber)
      setIsDeployingMulticall(false)
    }

    if (isLocalChain(chainId) && !multicallAddress) {
      setIsDeployingMulticall(true)
      deployMulticall()
    }
  }, [library, chainId])

  const awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber

  if (chainId && isLocalChain(chainId) && (!multicallAddress || awaitingMulticallBlock)) {
    return <div>Deploying multicall...</div>
  }

  return <>{children}</>
}
