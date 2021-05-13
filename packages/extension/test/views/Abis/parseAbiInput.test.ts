import { expect } from 'chai'
import { parseAbiInput } from '../../../src/views/Abis/parseAbiInput'

const ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

describe('parseAbiInput', () => {
  it('empty input', () => {
    const entries = parseAbiInput('')
    expect(entries).to.deep.equal([])
  })

  it('json array', () => {
    const entries = parseAbiInput(JSON.stringify(ABI))
    expect(entries.map((x) => x.code)).to.deep.equal([
      'function name() view returns (string)',
      'function approve(address spender, uint256 value) returns (bool)',
    ])
  })

  it('json object', () => {
    const entries = parseAbiInput(JSON.stringify(ABI[0]))
    expect(entries.map((x) => x.code)).to.deep.equal(['function name() view returns (string)'])
  })

  it('invalid json', () => {
    expect(() => parseAbiInput(JSON.stringify([{ foo: 'bar' }]))).to.throw(Error)
  })

  it('single line abi', () => {
    const entries = parseAbiInput('function name() view returns (string)')
    expect(entries.map((x) => x.code)).to.deep.equal(['function name() view returns (string)'])
  })

  it('many lines abi', () => {
    const entries = parseAbiInput(`
      function name() view returns (string)
      function approve(address spender, uint256 value) returns (bool)
    `)
    expect(entries.map((x) => x.code)).to.deep.equal([
      'function name() view returns (string)',
      'function approve(address spender, uint256 value) returns (bool)',
    ])
  })

  it('invalid solidity', () => {
    expect(() => parseAbiInput('function returns x()')).to.throw(Error)
  })
})
