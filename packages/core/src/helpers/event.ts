export type Effect = () => (() => void) | undefined | void

/**
 * Effect that's been added to a specific Event.
 */
interface MaterializedEffect {
  effect: Effect
  cleanup: (() => void) | undefined
}

export interface ReadOnlyEvent<T> {
  on: (cb: (data: T) => void) => () => void
  off: (cb: (data: T) => void) => void
  emit: (data: T) => void
  addEffect: (effect: Effect) => () => void
}

export class Event<T = void> implements ReadOnlyEvent<T> {
  private readonly _listeners = new Set<(data: T) => void>()
  private readonly _effects = new Set<MaterializedEffect>()

  emit(data: T) {
    for (const listener of Array.from(this._listeners)) {
      void this._trigger(listener, data)
    }
  }

  on(callback: (data: T) => void): () => void {
    this._listeners.add(callback)

    if (this.listenerCount() === 1) {
      this._runEffects()
    }

    return () => this.off(callback)
  }

  off(callback: (data: T) => void) {
    this._listeners.delete(callback)

    if (this.listenerCount() === 0) {
      this._cleanupEffects()
    }
  }

  listenerCount() {
    return this._listeners.size
  }

  addEffect(effect: Effect): () => void {
    const handle: MaterializedEffect = { effect, cleanup: undefined }

    if (this.listenerCount() > 0) {
      const cleanup = handle.effect()
      if (typeof cleanup === 'function') {
        handle.cleanup = cleanup
      }
    }

    this._effects.add(handle)
    return () => {
      // eslint-disable-next-line no-unused-expressions
      handle.cleanup?.()
      this._effects.delete(handle)
    }
  }

  private async _trigger(listener: (data: T) => void, data: T) {
    try {
      await waitImmediate() // Acts like setImmediate but preserves the stack-trace.
      listener(data)
    } catch (error: any) {
      // Stop error propagation.
      throwUnhandledRejection(error)
    }
  }

  private _runEffects() {
    for (const handle of Array.from(this._effects)) {
      const cleanup = handle.effect()
      if (typeof cleanup === 'function') {
        handle.cleanup = cleanup
      }
    }
  }

  private _cleanupEffects() {
    for (const handle of Array.from(this._effects)) {
      // eslint-disable-next-line no-unused-expressions
      handle.cleanup?.()
      handle.cleanup = undefined
    }
  }
}

function throwUnhandledRejection(error: Error) {
  setTimeout(() => {
    throw error
  })
}

/**
 * Like setImmediate but for async/await API. Useful for preserving stack-traces.
 */
const waitImmediate = () => new Promise((resolve) => setTimeout(resolve))
