import { expect } from 'chai'
import { deepEqual, isPrimitive } from './common'
import { Filter } from '@ethersproject/abstract-provider'

describe('common', function () {
  describe('isPrimitive', function () {
    it('Returns true for 0', function () {
      expect(isPrimitive(0)).to.equal(true)
    })

    it('Returns true for 1', function () {
      expect(isPrimitive(1)).to.equal(true)
    })

    it("Returns true for 'a'", function () {
      expect(isPrimitive('a')).to.equal(true)
    })

    it("Returns true for ''", function () {
      expect(isPrimitive('')).to.equal(true)
    })

    it('Returns true for undefined', function () {
      expect(isPrimitive(undefined)).to.equal(true)
    })

    it('Returns true for null', function () {
      expect(isPrimitive(null)).to.equal(true)
    })

    it('Returns true for true', function () {
      expect(isPrimitive(true)).to.equal(true)
    })

    it('Returns true for false', function () {
      expect(isPrimitive(false)).to.equal(true)
    })

    it('Returns false for []', function () {
      expect(isPrimitive([])).to.equal(false)
    })

    it('Returns false for {}', function () {
      expect(isPrimitive({})).to.equal(false)
    })
  })

  describe('deepEqual', function () {
    it('Returns true for 0 and 0', function () {
      expect(deepEqual(0, 0)).to.equal(true)
    })

    it('Returns true for 1 and 1', function () {
      expect(deepEqual(1, 1)).to.equal(true)
    })

    it("Returns true for 'a' and 'a'", function () {
      expect(deepEqual('a', 'a')).to.equal(true)
    })

    it("Returns true for '' and ''", function () {
      expect(deepEqual('', '')).to.equal(true)
    })

    it('Returns true for undefined and undefined', function () {
      expect(deepEqual(undefined, undefined)).to.equal(true)
    })

    it('Returns true for null and null', function () {
      expect(deepEqual(null, null)).to.equal(true)
    })

    it('Returns true for true and true', function () {
      expect(deepEqual(true, true)).to.equal(true)
    })

    it('Returns true for false and false', function () {
      expect(deepEqual(false, false)).to.equal(true)
    })

    it('Returns true for [] and []', function () {
      expect(deepEqual([], [])).to.equal(true)
    })

    it('Returns true for undefined and null', function () {
      expect(deepEqual(undefined, null)).to.equal(true)
    })

    it('Returns true for null and undefined', function () {
      expect(deepEqual(null, undefined)).to.equal(true)
    })

    it('Returns true for two block filters with different property orderings', function () {
      const filter1: Filter = {
        fromBlock: 1,
        toBlock: 2,
      }

      const filter2: Filter = {
        toBlock: 2,
        fromBlock: 1,
      }

      expect(deepEqual(filter1, filter2)).to.equal(true)
    })

    it('Returns false for two block filters with different property counts (one has less than two)', function () {
      const filter1: Filter = {
        fromBlock: 1,
      }

      const filter2: Filter = {
        fromBlock: 1,
        toBlock: 2,
      }

      expect(deepEqual(filter1, filter2)).to.equal(false)
    })

    it('Returns false for two block filters with different property counts (one has more than two)', function () {
      const filter1: Filter = {
        fromBlock: 1,
        toBlock: 2,
      }

      const filter2: Filter = {
        fromBlock: 1,
      }

      expect(deepEqual(filter1, filter2)).to.equal(false)
    })

    it('Returns false for two block filters with different addresses', function () {
      const filter1: Filter = {
        address: '0x0000000000000000000000000000000000000000',
      }

      const filter2: Filter = {
        address: '0x0000000000000000000000000000000000000001',
      }

      expect(deepEqual(filter1, filter2)).to.equal(false)
    })

    it("Returns false for 0 and '0'", function () {
      expect(deepEqual(0, '0')).to.equal(false)
    })

    it("Returns false for '0' and 0", function () {
      expect(deepEqual('0', 0)).to.equal(false)
    })

    it('Returns false for false and 0', function () {
      expect(deepEqual(false, 0)).to.equal(false)
    })

    it('Returns false for 0 and false', function () {
      expect(deepEqual(0, false)).to.equal(false)
    })

    it('Returns false for 0 and null', function () {
      expect(deepEqual(0, null)).to.equal(false)
    })

    it('Returns false for null and 0', function () {
      expect(deepEqual(null, 0)).to.equal(false)
    })

    it('Returns false for 0 and undefined', function () {
      expect(deepEqual(0, undefined)).to.equal(false)
    })

    it('Returns false for undefined and 0', function () {
      expect(deepEqual(undefined, 0)).to.equal(false)
    })

    it("Returns false for '' and null", function () {
      expect(deepEqual('', null)).to.equal(false)
    })

    it("Returns false for null and ''", function () {
      expect(deepEqual(null, '')).to.equal(false)
    })

    it("Returns false for '' and undefined", function () {
      expect(deepEqual('', undefined)).to.equal(false)
    })

    it("Returns false for undefined and ''", function () {
      expect(deepEqual(undefined, '')).to.equal(false)
    })

    it('Returns false for {} and {}', function () {
      expect(deepEqual({}, {})).to.equal(true)
    })

    it('Returns false for 0 and 1', function () {
      expect(deepEqual(0, 1)).to.equal(false)
    })

    it('Returns false for 1 and 0', function () {
      expect(deepEqual(1, 0)).to.equal(false)
    })

    it("Returns false for 'a' and 'b'", function () {
      expect(deepEqual('a', 'b')).to.equal(false)
    })

    it("Returns false for 'b' and 'a'", function () {
      expect(deepEqual('b', 'a')).to.equal(false)
    })

    it("Returns false for '' and 'a'", function () {
      expect(deepEqual('', 'a')).to.equal(false)
    })

    it("Returns false for 'a' and ''", function () {
      expect(deepEqual('a', '')).to.equal(false)
    })

    it('Retuens false for [0] and [0, 0]', function () {
      expect(deepEqual([0], [0, 0])).to.equal(false)
    })

    it('Returns false for [0, 0] and [0]', function () {
      expect(deepEqual([0, 0], [0])).to.equal(false)
    })

    it('Returns false for [0] and [1]', function () {
      expect(deepEqual([0], [1])).to.equal(false)
    })

    it('Returns false for [1] and [0]', function () {
      expect(deepEqual([1], [0])).to.equal(false)
    })

    it('Returns false for [0] and [null]', function () {
      expect(deepEqual([0], [null])).to.equal(false)
    })

    it('Returns false for [null] and [0]', function () {
      expect(deepEqual([null], [0])).to.equal(false)
    })

    it('Returns false for [0] and [undefined]', function () {
      expect(deepEqual([0], [undefined])).to.equal(false)
    })

    it('Returns false for [undefined] and [0]', function () {
      expect(deepEqual([undefined], [0])).to.equal(false)
    })

    it('Returns false for [0] and [{}]', function () {
      expect(deepEqual([0], [{}])).to.equal(false)
    })

    it('Returns false for [{}] and [0]', function () {
      expect(deepEqual([{}], [0])).to.equal(false)
    })

    it('Returns false for [0, 1] and [1, 0]', function () {
      expect(deepEqual([0, 1], [1, 0])).to.equal(false)
    })

    it('Returns false for [1, 0] and [0, 1]', function () {
      expect(deepEqual([1, 0], [0, 1])).to.equal(false)
    })
  })
})
