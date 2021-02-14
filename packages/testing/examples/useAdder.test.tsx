import { expect } from 'chai'
import { AdderProvider, useAdder } from './useAdder'
import { renderWeb3Hook } from '../src'

describe('useAdder', () => {
  it('properly renders without arguments or context wrapper', async () => {
    const { result } = await renderWeb3Hook(useAdder)

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(0)
  })

  it('properly renders with arguments', async () => {
    const { result: firstExample } = await renderWeb3Hook(() => useAdder(1, 1))
    const { result: secondExample } = await renderWeb3Hook(({ arg1, arg2 }) => useAdder(arg1, arg2), {
      renderHook: { initialProps: { arg1: 1, arg2: 1 } },
    })

    expect(firstExample.current.sum).to.be.equal(2)
    expect(secondExample.current.sum).to.be.equal(2)
  })

  it('properly renders with changing arguments', async () => {
    const { result, rerender } = await renderWeb3Hook(({ arg1, arg2 }) => useAdder(arg1, arg2), {
      renderHook: { initialProps: { arg1: 1, arg2: 1 } },
    })

    expect(result.current.sum).to.be.equal(2)

    rerender({ arg1: 2, arg2: 3 })

    expect(result.current.sum).to.be.equal(5)
  })

  it('properly renders with context wrapper', async () => {
    const { result: firstExample } = await renderWeb3Hook(useAdder, {
      renderHook: {
        wrapper: ({ children }) => <AdderProvider value={{ prov1: 2, prov2: 2 }}>{children}</AdderProvider>,
      },
    })
    const { result: secondExample } = await renderWeb3Hook(() => useAdder(), {
      renderHook: {
        wrapper: ({ children, prov1, prov2 }) => <AdderProvider value={{ prov1, prov2 }}>{children}</AdderProvider>,
        initialProps: { prov1: 2, prov2: 2 },
      },
    })

    expect(firstExample.current.sum).to.be.equal(4)
    expect(secondExample.current.sum).to.be.equal(4)
  })

  it('properly renders with context wrapper changing props', async () => {
    const { result, rerender } = await renderWeb3Hook(() => useAdder(), {
      renderHook: {
        wrapper: ({ children, prov1, prov2 }) => <AdderProvider value={{ prov1, prov2 }}>{children}</AdderProvider>,
        initialProps: { prov1: 2, prov2: 2 },
      },
    })

    expect(result.current.sum).to.be.equal(4)

    rerender({ prov1: 3, prov2: 3 })

    expect(result.current.sum).to.be.equal(6)
  })

  it('properly renders with arguments and context wrapper', async () => {
    const { result } = await renderWeb3Hook(({ arg1, arg2 }) => useAdder(arg1, arg2), {
      renderHook: {
        wrapper: ({ children, prov1, prov2 }) => <AdderProvider value={{ prov1, prov2 }}>{children}</AdderProvider>,
        initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 },
      },
    })

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(6)
  })

  it('properly renders with changing arguments and context wrapper changing props', async () => {
    const { result, rerender } = await renderWeb3Hook(({ arg1, arg2 }) => useAdder(arg1, arg2), {
      renderHook: {
        wrapper: ({ children, prov1, prov2 }) => <AdderProvider value={{ prov1, prov2 }}>{children}</AdderProvider>,
        initialProps: { arg1: 1, arg2: 1, prov1: 2, prov2: 2 },
      },
    })

    expect(result.error).to.be.undefined
    expect(result.current.sum).to.be.equal(6)

    rerender({ arg1: 2, arg2: 2, prov1: 3, prov2: 3 })
    expect(result.current.sum).to.be.equal(10)
  })
})
