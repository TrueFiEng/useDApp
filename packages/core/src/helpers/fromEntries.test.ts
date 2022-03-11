import { expect } from 'chai'
import { fromEntries } from '../../src/helpers/fromEntries'

describe('fromEntries', () => {
  it('correctly wraps Object.fromEntries', async () => {
    expect(
      fromEntries([
        ['a', 1],
        ['b', 2],
      ])
    ).to.deep.equal({ a: 1, b: 2 })
  })
})
