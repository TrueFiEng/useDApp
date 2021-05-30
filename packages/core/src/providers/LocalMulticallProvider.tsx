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

  const multicallAddress =
    chainId !== undefined && multicallAddresses !== undefined ? multicallAddresses[chainId] : undefined

  useEffect(() => {
    if (isDeployingMulticall || multicallAddress !== undefined || library === undefined || chainId === undefined) {
      return
    }
    setIsDeployingMulticall(true)

    const deployContractIfLocal = async () => {
      if (isLocalChain(chainId) && multicallAddress === undefined) {
        const { contractAddress, receipt } = await deployContract(multicallABI, library.getSigner())
        console.log(`Deploying Multicall with contract address "${contractAddress}"`)

        updateConfig({
          multicallAddresses: {
            [chainId]: contractAddress,
          },
        })
        setMulticallBlockNumber(receipt.blockNumber)
      }
    }
    deployContractIfLocal()
  }, [library, chainId])

  const awaitingMulticallBlock =
    multicallBlockNumber !== undefined && blockNumber !== undefined && blockNumber < multicallBlockNumber

  if (chainId !== undefined && isLocalChain(chainId) && (!multicallAddress || awaitingMulticallBlock)) {
    return <div>Deploying multicall...</div>
  }

  return <>{children}</>
}
