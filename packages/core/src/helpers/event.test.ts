import { expect } from 'chai'
import waitForExpect from 'wait-for-expect'
import { sleep } from '../testing'
import { Event } from './event'

describe('Event', () => {
  it('Triggers event', async () => {
    const event = new Event<number>()
    const numbers: number[] = []
    event.on((val) => {
      numbers.push(val)
    })
    event.emit(1)

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1])
    })

    event.emit(2)
    event.emit(3)

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1, 2, 3])
    })
  })

  it('Triggers event asynchnously', async () => {
    const event = new Event<number>()
    const numbers: number[] = []
    event.on((val) => {
      numbers.push(val)
    })
    event.emit(1)
    expect(numbers).to.deep.equal([])

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1])
    })
  })

  it('Removes event using returned function', async () => {
    const event = new Event<number>()
    const numbers: number[] = []
    const unsub = event.on((val) => {
      numbers.push(val)
    })
    event.emit(1)

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1])
    })

    unsub()
    event.emit(2)
    await sleep(100)
    expect(numbers).to.deep.equal([1])
  })

  it('Removes event using off method', async () => {
    const event = new Event<number>()
    const numbers: number[] = []
    const listener = (val: number) => {
      numbers.push(val)
    }
    event.on(listener)
    event.emit(1)

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1])
    })

    event.off(listener)
    event.emit(2)
    await sleep(100)
    expect(numbers).to.deep.equal([1])
  })

  it('Triggers multiple events and can remove them', async () => {
    const event = new Event<number>()
    const numbers: number[] = []
    const unsub1 = event.on((val) => {
      numbers.push(val)
    })
    const unsub2 = event.on((val) => {
      numbers.push(val)
    })
    event.emit(1)

    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1, 1])
    })

    unsub1()
    event.emit(2)
    await waitForExpect(() => {
      expect(numbers).to.deep.equal([1, 1, 2])
    })

    unsub2()
    event.emit(3)
    await sleep(100)
    expect(numbers).to.deep.equal([1, 1, 2])
  })

  it('Triggers effects', async () => {
    const event = new Event<number>()
    let num = 0
    const removeEffect = event.addEffect(() => {
      num += 1
    })

    //eslint-disable-next-line @typescript-eslint/no-empty-function
    event.on(() => {})
    expect(num).to.eq(1)
    //eslint-disable-next-line @typescript-eslint/no-empty-function
    event.on(() => {})
    expect(num).to.eq(1)

    removeEffect()

    //eslint-disable-next-line @typescript-eslint/no-empty-function
    event.on(() => {})
    expect(num).to.eq(1)
    event.addEffect(() => {
      num += 2
    })
    expect(num).to.eq(3)
  })
})
