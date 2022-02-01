import { expect } from "chai"
import { Contract, utils } from "ethers"
import { Interface } from "ethers/lib/utils"
import { Call, CallError, decodeCallResult, RawCallResult } from "../../src"

describe('decodeCallResult', () => {
  const erc20Abi = ['function name() view returns (string)']
  const call: Call = {
    contract: new Contract(`0x${'0'.repeat(39)}1`, new Interface(erc20Abi)),
    method: 'name',
    args: []
  }

  it('loading', () => {
    const result: RawCallResult = { value: '', success: true }
    expect(decodeCallResult(undefined, result)).to.deep.equal({ status: 'Loading' })
    expect(decodeCallResult(call, undefined)).to.deep.equal({ status: 'Loading' })
  })

  it('error', () => {
    const errorMessage = 'Testing error message'
    const errorResult: RawCallResult = {
      success: false,
      value: new utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage])
    }
    expect(decodeCallResult(call, errorResult)).to.deep.equal({ status: 'Error', error: new CallError(errorMessage) })
  })

  it('success', () => {
    const name = 'Testing ERC20'
    const successResult: RawCallResult = {
      success: true,
      value: call.contract.interface.encodeFunctionResult('name', [name])
    }
    expect(decodeCallResult(call, successResult)).to.deep.equal({ status: 'Success', value: [name] })
  })
})
