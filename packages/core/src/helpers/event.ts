export class Event<T = void> {
  private readonly _listeners = new Set<(data: T) => void>()

  emit(data: T) {
    for (const listener of Array.from(this._listeners)) {
      void this._trigger(listener, data)
    }
  }

  on(callback: (data: T) => void): () => void {
    this._listeners.add(callback)

    return () => this.off(callback)
  }

  off(callback: (data: T) => void) {
    this._listeners.delete(callback)
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
