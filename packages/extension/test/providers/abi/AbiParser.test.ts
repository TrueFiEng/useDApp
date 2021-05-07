import { expect } from 'chai'
import { AbiParser } from '../../../src/providers/abi/AbiParser'

describe('AbiParser', () => {
  it('unknown name', () => {
    const parser = new AbiParser()
    const { name } = parser.get('0xAABBCCDD')
    expect(name).to.equal('aabbccdd')
  })

  it('unknown call data', () => {
    const parser = new AbiParser()
    const { parseCallData } = parser.get('0xAABBCCDD')
    const result = parseCallData('0xAABBCCDD1A2B3C')
    expect(result).to.deep.equal([
      {
        type: 'bytes',
        name: 'data',
        value: '1a2b3c',
      },
    ])
  })

  it('unknown call result', () => {
    const parser = new AbiParser()
    const { parseCallResult } = parser.get('0xAABBCCDD')
    const result = parseCallResult('0x1A2B3C')
    expect(result).to.deep.equal({
      type: 'bytes',
      name: '',
      value: '1a2b3c',
    })
  })
})
