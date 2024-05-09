import { Filter } from '@ethersproject/abstract-provider'
import { renderHook } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { useResolvedPromise } from './useResolvedPromise'
import { deepEqual } from '../helpers'

describe('useResolvedPromise', function () {
  it('Resolves a block filter', async function () {
    const filter: Filter = { toBlock: 1 }

    const filterPromise = new Promise<Filter>((resolve) => {
      resolve(filter)
    })

    const result = renderHook(() => useResolvedPromise(filterPromise))

    await result.waitForNextUpdate()

    expect(deepEqual(filter, result.result.current)).to.equal(true)
  })

  it("Immediately returns undefined if the promise hasn't resolved", async function () {
    const filterPromise = new Promise<Filter>(() => {})

    const result = renderHook(() => useResolvedPromise(filterPromise))

    expect(result.result.current).to.equal(undefined)
  })

  it("Immediately returns the value if it's not a promise", async function () {
    const filter: Filter = { toBlock: 1 }

    const result = renderHook(() => useResolvedPromise(filter))

    expect(deepEqual(filter, result.result.current)).to.equal(true)
  })
})
