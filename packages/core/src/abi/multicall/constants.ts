import { utils } from 'ethers'
import MultiCall from '../../constants/abi/MultiCall.json'

export const ethersAbi = new utils.Interface(MultiCall.abi)
export const defaultMulticall1ErrorMessage =
  'One of the calls reverted in Multicall v1. See https://usedapp-docs.netlify.app/docs/Guides/Troubleshooting for more details.'
