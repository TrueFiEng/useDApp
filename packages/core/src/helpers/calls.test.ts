import { expect } from 'chai'
import { Contract, utils } from 'ethers'
import { Interface } from 'ethers/lib/utils'
import { Call, RawCallResult } from '../../src'
import { decodeCallResult } from './calls'

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

  it('call error', () => {
    const errorMessage = 'Testing error message'
    const errorResult: RawCallResult = {
      success: false,
      value: new utils.Interface(['function Error(string)']).encodeFunctionData('Error', [errorMessage]),
    }
    const { value, error } = decodeCallResult(call, errorResult) || {}
    expect(value).to.be.undefined
    expect(error?.message).to.equal(errorMessage)
  })

  it('decoding error', () => {
    const result: RawCallResult = {
      success: true,
      value: '0x0',
    }
    const { value, error } = decodeCallResult(call, result) || {}
    expect(value).to.be.undefined
    expect(error?.message.startsWith('hex data is odd-length')).to.be.true
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
