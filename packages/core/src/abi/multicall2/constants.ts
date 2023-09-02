import { Interface } from 'ethers'
import MultiCall2 from '../../constants/abi/MultiCall2.json'

export const ethersAbi = new Interface(MultiCall2.abi)

export const trueEncoded = '0'.repeat(63) + '1'
export const falseEncoded = '0'.repeat(63) + '0'
