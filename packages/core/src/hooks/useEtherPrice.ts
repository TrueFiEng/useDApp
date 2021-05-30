import { BigNumber } from "ethers"
import { UniswapPairInterface, } from "../constants"
import { useContractCall } from "./useContractCall"
import { useTokenPrice } from '../tokens/useTokenPrice'

export function useEtherPrice(): BigNumber | undefined {
    // Dai / WETH
    return useTokenPrice('0x6B175474E89094C44Da98b954EedeAC495271d0F', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',)
}





