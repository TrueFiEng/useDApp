import { expect } from 'chai'
import { useExample } from './useExample'
import { renderWeb3Hook } from '../src'

describe('useBlockMeta', () => {
  it('properly renders and returns first value without arguments or provided context', async () => {
    const { result } = await renderWeb3Hook(useExample)

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.a('number')
    expect(result.current.sum).to.be.equal(0)
  })
})
