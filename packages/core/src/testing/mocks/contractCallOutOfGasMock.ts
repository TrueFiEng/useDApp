import { TransactionReceipt, TransactionResponse } from 'ethers'
import { Contract } from 'ethers'

const transferOutOfGasMock = (): TransactionResponse => {
  return {
    wait: (): Promise<TransactionReceipt> => {
      return Promise.reject({ reason: 'out of gas' })
    },
  } as TransactionResponse
}

export const contractCallOutOfGasMock = ({
  transfer: transferOutOfGasMock,
  signer: true,
} as unknown) as Contract
