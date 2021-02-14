import { RenderResult } from '@testing-library/react-hooks'
import { waitUntil } from './waitUntil'

export const getWaitUtils = <TResult>(hookResult: RenderResult<TResult>) => {
  const waitForCurrent = async (predicate: (value: TResult) => boolean, step?: number, timeout?: number) => {
    await waitUntil(() => predicate(hookResult.current), step, timeout)
  }

  const waitForCurrentEqual = async (value: TResult, step?: number, timeout?: number) => {
    await waitForCurrent((val) => val === value, step, timeout)
  }

  return {
    waitForCurrent,
    waitForCurrentEqual,
  }
}
