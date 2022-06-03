import { utils } from 'ethers'
import MultiCall from '../../constants/abi/MultiCall.json'

export const ethersAbi = new utils.Interface(MultiCall.abi)
