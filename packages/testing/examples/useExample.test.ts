import { expect } from 'chai'
import { useExample } from './useExample'
import { renderWeb3Hook } from '../src'

describe('useExample', () => {
  it('properly renders without arguments or context wrapper', async () => {
    const { result } = await renderWeb3Hook(useExample)

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(0)
  })

  it('properly renders with arguments', async () => {
    const { result } = await renderWeb3Hook(() => useExample(2, 3))

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(5)
  })

  it('properly renders with changing arguments', async () => {
    const { result, waitForCurrent, rerender } = await renderWeb3Hook(
      ({arg1, arg2}) => useExample(arg1, arg2),
      {renderHook: {initialProps: {arg1: 2, arg2: 3}}}
    )

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(5)

    rerender({arg1: 5, arg2: 7})

    await waitForCurrent(val => val.sum !== 5)
    expect(result.current.sum).to.be.equal(12)
  })

  it.skip('properly renders with context wrapper', async () => {

  })

  it.skip('properly renders with context wrapper changing props', async () => {

  })

  it.skip('properly renders with arguments and context wrapper', async () => {

  })

  it.skip('properly renders with changing arguments and context wrapper changing props', async () => {

  })
})
