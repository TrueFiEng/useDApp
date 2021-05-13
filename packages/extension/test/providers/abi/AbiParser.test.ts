import { expect } from 'chai'
import { Interface } from '@ethersproject/abi'
import { AbiParser } from '../../../src/providers/abi/AbiParser'

describe('AbiParser', () => {
  describe('name', () => {
    const abis = ['function foo(uint) view returns (bool)', 'function bar()']
    const coder = new Interface(abis)
    const parser = AbiParser.fromAbis(abis)

    it('unknown name', () => {
      const { name } = parser.get('0xAABBCCDD')
      expect(name).to.equal('aabbccdd')
    })

    it('known name', () => {
      const { name } = parser.get(coder.getSighash('foo'))
      expect(name).to.equal('foo')
    })
  })

  describe('call data', () => {
    function encodeAndDecode(abi: string, args: any[]) {
      const coder = new Interface([abi])
      const parser = AbiParser.fromAbis([abi])
      const fragment = coder.functions[Object.keys(coder.functions)[0]]
      const data = coder.encodeFunctionData(fragment, args)
      return parser.get(coder.getSighash(fragment)).parseCallData(data)
    }

    it('unknown call with no arguments', () => {
      const { parseCallData } = new AbiParser([]).get('0x12345678')
      const result = parseCallData('0x12345678')
      expect(result).to.deep.equal([])
    })

    it('unknown call', () => {
      const { parseCallData } = new AbiParser([]).get('0x12345678')
      const result = parseCallData('0x12345678aabbcc')
      expect(result).to.deep.equal([
        {
          type: 'bytes',
          name: 'data',
          value: 'aabbcc',
        },
      ])
    })

    it('empty call', () => {
      const result = encodeAndDecode('function empty()', [])
      expect(result).to.deep.equal([])
    })

    it('named and unnamed arguments', () => {
      const result = encodeAndDecode('function mixed(uint256 a, bool, bool c, uint256)', [1, false, true, 2])
      expect(result).to.deep.equal([
        {
          type: 'number',
          name: 'a',
          value: '1',
        },
        {
          type: 'boolean',
          name: '#1',
          value: false,
        },
        {
          type: 'boolean',
          name: 'c',
          value: true,
        },
        {
          type: 'number',
          name: '#3',
          value: '2',
        },
      ])
    })

    it('treats input as unknown if it does not parse', () => {
      const abi = ['function foo(uint)']
      const coder = new Interface(abi)
      const parser = AbiParser.fromAbis(abi)
      const fragment = coder.functions[Object.keys(coder.functions)[0]]
      const selector = coder.getSighash(fragment)
      const data = selector + 'aabbcc'
      const result = parser.get(selector).parseCallData(data)
      expect(result).to.deep.equal([
        {
          type: 'bytes',
          name: 'data',
          value: 'aabbcc',
        },
      ])
    })

    describe('types', () => {
      const testCases = [
        {
          inputType: 'uint256',
          inputValue: '12345678901234567890',
          outputType: 'number',
          outputValue: '12345678901234567890',
        },
        {
          inputType: 'uint8',
          inputValue: 123,
          outputType: 'number',
          outputValue: '123',
        },
        {
          inputType: 'int256',
          inputValue: -56789,
          outputType: 'number',
          outputValue: '-56789',
        },
        {
          inputType: 'bool',
          inputValue: true,
          outputType: 'boolean',
          outputValue: true,
        },
        {
          inputType: 'address',
          inputValue: '0x' + '1'.repeat(40),
          outputType: 'address',
          outputValue: '0x' + '1'.repeat(40),
        },
        {
          inputType: 'bytes5',
          inputValue: '0xaabbccddee',
          outputType: 'bytes',
          outputValue: 'aabbccddee',
        },
        {
          inputType: 'bytes',
          inputValue: '0xaabbccddee',
          outputType: 'bytes',
          outputValue: 'aabbccddee',
        },
        {
          inputType: 'uint[3]',
          inputValue: [5, 6, 42],
          outputType: 'array',
          outputValue: [
            {
              type: 'number',
              name: '#0',
              value: '5',
            },
            {
              type: 'number',
              name: '#1',
              value: '6',
            },
            {
              type: 'number',
              name: '#2',
              value: '42',
            },
          ],
        },
        {
          inputType: 'bool[][]',
          inputValue: [[true], [true, false], [false]],
          outputType: 'array',
          outputValue: [
            {
              type: 'array',
              name: '#0',
              value: [
                {
                  type: 'boolean',
                  name: '#0',
                  value: true,
                },
              ],
            },
            {
              type: 'array',
              name: '#1',
              value: [
                {
                  type: 'boolean',
                  name: '#0',
                  value: true,
                },
                {
                  type: 'boolean',
                  name: '#1',
                  value: false,
                },
              ],
            },
            {
              type: 'array',
              name: '#2',
              value: [
                {
                  type: 'boolean',
                  name: '#0',
                  value: false,
                },
              ],
            },
          ],
        },
        {
          inputType: 'tuple()',
          inputValue: [null],
          outputType: 'tuple',
          outputValue: [],
        },
        {
          inputType: 'tuple(uint, bool b)',
          inputValue: [1, false],
          outputType: 'tuple',
          outputValue: [
            {
              type: 'number',
              name: '#0',
              value: '1',
            },
            {
              type: 'boolean',
              name: 'b',
              value: false,
            },
          ],
        },
        {
          inputType: 'tuple(tuple(bool, bool)[] a, tuple(bool, bool) b)',
          inputValue: [
            [
              [false, false],
              [true, true],
            ],
            [true, false],
          ],
          outputType: 'tuple',
          outputValue: [
            {
              type: 'array',
              name: 'a',
              value: [
                {
                  type: 'tuple',
                  name: '#0',
                  value: [
                    {
                      type: 'boolean',
                      name: '#0',
                      value: false,
                    },
                    {
                      type: 'boolean',
                      name: '#1',
                      value: false,
                    },
                  ],
                },
                {
                  type: 'tuple',
                  name: '#1',
                  value: [
                    {
                      type: 'boolean',
                      name: '#0',
                      value: true,
                    },
                    {
                      type: 'boolean',
                      name: '#1',
                      value: true,
                    },
                  ],
                },
              ],
            },
            {
              type: 'tuple',
              name: 'b',
              value: [
                {
                  type: 'boolean',
                  name: '#0',
                  value: true,
                },
                {
                  type: 'boolean',
                  name: '#1',
                  value: false,
                },
              ],
            },
          ],
        },
      ]

      for (const testCase of testCases) {
        it(testCase.inputType, () => {
          const result = encodeAndDecode(`function foo(${testCase.inputType})`, [testCase.inputValue])
          expect(result).to.deep.equal([
            {
              type: testCase.outputType,
              name: '#0',
              value: testCase.outputValue,
            },
          ])
        })
      }
    })
  })

  describe('call result', () => {
    function encodeAndDecode(abi: string, args: any[]) {
      const coder = new Interface([abi])
      const parser = AbiParser.fromAbis([abi])
      const fragment = coder.functions[Object.keys(coder.functions)[0]]
      const data = coder.encodeFunctionResult(fragment, args)
      return parser.get(coder.getSighash(fragment)).parseCallResult(data)
    }

    it('unknown call result', () => {
      const { parseCallResult } = new AbiParser([]).get('0xAABBCCDD')
      const result = parseCallResult('0x1A2B3C')
      expect(result).to.deep.equal({
        type: 'bytes',
        name: '#0',
        value: '1a2b3c',
      })
    })

    it('unknown empty result', () => {
      const { parseCallResult } = new AbiParser([]).get('0xAABBCCDD')
      const result = parseCallResult('')
      expect(result).to.deep.equal({
        type: 'bytes',
        name: '#0',
        value: '',
      })
    })

    it('single result', () => {
      const result = encodeAndDecode('function foo() returns (uint)', [1])
      expect(result).to.deep.equal({
        type: 'number',
        name: '#0',
        value: '1',
      })
    })

    it('multiple results', () => {
      const result = encodeAndDecode('function foo() returns (uint, bool)', [1, false])
      expect(result).to.deep.equal({
        type: 'tuple',
        name: '#0',
        value: [
          {
            type: 'number',
            name: '#0',
            value: '1',
          },
          {
            type: 'boolean',
            name: '#1',
            value: false,
          },
        ],
      })
    })

    it('named results', () => {
      const result = encodeAndDecode('function foo() returns (uint a, bool b)', [1, false])
      expect(result).to.deep.equal({
        type: 'tuple',
        name: '#0',
        value: [
          {
            type: 'number',
            name: 'a',
            value: '1',
          },
          {
            type: 'boolean',
            name: 'b',
            value: false,
          },
        ],
      })

      it('no return value', () => {
        const abi = ['function foo()']
        const coder = new Interface(abi)
        const parser = AbiParser.fromAbis(abi)
        const fragment = coder.functions[Object.keys(coder.functions)[0]]
        const data = 'aabbcc'
        const result = parser.get(coder.getSighash(fragment)).parseCallResult(data)
        expect(result).to.deep.equal({
          type: 'bytes',
          name: '#0',
          value: data,
        })
      })

      it('invalid return value', () => {
        const abi = ['function foo() returns (bool)']
        const coder = new Interface(abi)
        const parser = AbiParser.fromAbis(abi)
        const fragment = coder.functions[Object.keys(coder.functions)[0]]
        const data = 'aabbcc'
        const result = parser.get(coder.getSighash(fragment)).parseCallResult(data)
        expect(result).to.deep.equal({
          type: 'bytes',
          name: '#0',
          value: data,
        })
      })
    })
  })
})
