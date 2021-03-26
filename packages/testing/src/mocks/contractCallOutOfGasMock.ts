import { BigNumber } from '@ethersproject/bignumber'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { Contract } from 'ethers'

const transferOutOfGasMock = (address: string, value: BigNumber): TransactionResponse => {
  return {
    wait: (): Promise<TransactionReceipt> => {
      return Promise.reject({ reason: 'out of gas' })
    },
  } as TransactionResponse
}

export const contractCallOutOfGasMock = ({
  transfer: transferOutOfGasMock,
} as unknown) as Contract
