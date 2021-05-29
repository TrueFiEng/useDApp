import { ReactNode, useEffect } from 'react'
import { isLocalChain } from '../helpers'
import { deployMulticallIfLocal } from '../helpers/contract'
import { useConfig, useUpdateConfig } from './config'

interface LocalMulticallProps {
    children: ReactNode
}

export function LocalMulticall({ children }: LocalMulticallProps) {
    const updateConfig = useUpdateConfig()
    const { multicallAddresses, readOnlyUrls, readOnlyChainId } = useConfig()

    const chainId = readOnlyChainId
    const multicallAddress = chainId !== undefined && multicallAddresses !== undefined ? multicallAddresses[chainId] : undefined

    useEffect(() => {
        (async () => {
            if (chainId !== undefined && isLocalChain(chainId) && multicallAddress === undefined) {
                const address = await deployMulticallIfLocal(chainId, readOnlyUrls)

                if (address !== undefined) {
                    updateConfig({
                        multicallAddresses: {
                            [chainId]: address
                        },
                    })
                }
            }
        })()
    }, [])

    if (chainId !== undefined && isLocalChain(chainId) && !multicallAddress) {
        return <div>Deploying multicall...</div>
    }

    return <>
        {children}
    </>
}