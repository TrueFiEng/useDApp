import { expect } from 'chai'
import { Contract, utils } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import { Call, CallError, decodeCallResult, RawCallResult } from '../../src'

describe('decodeCallResult', () => {
  const erc20Abi = ['function name() view returns (string)']
  const call: Call = {
    contract: new Contract(`0x${'0'.repeat(39)}1`, new Interface(erc20Abi)),
    method: 'name',
    args: [],
  }

  it('one of arguments undefined', () => {
    const result: RawCallResult = { value: '', success: true }
    expect(decodeCallResult(undefined, result)).to.be.undefined
    expect(decodeCallResult(call, undefined)).to.be.undefined
  })

  it('error', () => {
    const errorMessage = 'Testing error message'
    const errorResult: RawCallResult = {
      success: false,
      value: new utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage]),
    }
    expect(decodeCallResult(call, errorResult)).to.deep.equal({ value: undefined, error: new CallError(errorMessage) })
  })

  it('success', () => {
    const name = 'Testing ERC20'
    const successResult: RawCallResult = {
      success: true,
      value: call.contract.interface.encodeFunctionResult('name', [name]),
    }
    expect(decodeCallResult(call, successResult)).to.deep.equal({ value: [name], error: undefined })
  })
})
