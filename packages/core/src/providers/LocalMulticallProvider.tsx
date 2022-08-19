import { ReactNode, useEffect, useState } from 'react'
import { utils, providers } from 'ethers'
import { getChainById } from '../helpers'
import { useEthers, useBlockNumber, useConfig, useUpdateConfig } from '../hooks'
import multicallABI from '../constants/abi/MultiCall.json'
import multicall2ABI from '../constants/abi/MultiCall2.json'
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
  const { library, chainId } = useEthers()

  const { multicallAddresses, multicallVersion } = useConfig()
  const [localMulticallState, setLocalMulticallState] = useState(LocalMulticallState.Unknown)
  const [multicallBlockNumber, setMulticallBlockNumber] = useState<number>()
  const blockNumber = useBlockNumber()

  useEffect(() => {
    if (!library || !chainId) {
      setLocalMulticallState(LocalMulticallState.Unknown)
    } else if (!getChainById(chainId)?.isLocalChain) {
      setLocalMulticallState(LocalMulticallState.NonLocal)
    } else if (multicallAddresses && multicallAddresses[chainId]) {
      setLocalMulticallState(LocalMulticallState.Deployed)
    } else if (localMulticallState !== LocalMulticallState.Deploying) {
      if (!(library instanceof providers.JsonRpcProvider)) {
        throw new Error('You cannot send transaction without wallet')
      }
      const signer = library.getSigner()
      if (!signer) {
        setLocalMulticallState(LocalMulticallState.Error)
        return
      }
      const checkDeployed = async () => {
        const localMulticallAddress = 'local_multicall_address' + chainId
        const multicallAddress = window.localStorage.getItem(localMulticallAddress)

        if (typeof multicallAddress === 'string' && utils.isAddress(multicallAddress)) {
          const multicallCode = await library.getCode(multicallAddress)
          if (multicallCode !== '0x') {
            updateConfig({ multicallAddresses: { [chainId]: multicallAddress } })
            return
          }
        }

        const signer = library.getSigner()
        if (!signer) {
          setLocalMulticallState(LocalMulticallState.Error)
          return
        }

        setLocalMulticallState(LocalMulticallState.Deploying)

        const deployMulticall = async () => {
          try {
            const { contractAddress, blockNumber } = await deployContract(
              multicallVersion === 1 ? multicallABI : multicall2ABI,
              signer
            )
            updateConfig({ multicallAddresses: { [chainId]: contractAddress } })
            window.localStorage.setItem(localMulticallAddress, contractAddress)
            setMulticallBlockNumber(blockNumber)
            setLocalMulticallState(LocalMulticallState.Deployed)
          } catch {
            setLocalMulticallState(LocalMulticallState.Error)
          }
        }
        void deployMulticall()
      }
      void checkDeployed()
    }
  }, [library, chainId])

  const awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber

  if (
    localMulticallState === LocalMulticallState.Deploying ||
    (localMulticallState === LocalMulticallState.Deployed && awaitingMulticallBlock)
  ) {
    return <div>Deploying multicall...</div>
  } else if (localMulticallState === LocalMulticallState.Error) {
    return <div>Error deploying multicall contract</div>
  } else {
    return <>{children}</>
  }
}
