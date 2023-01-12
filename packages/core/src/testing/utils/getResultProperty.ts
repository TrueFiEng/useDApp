import { RenderResult } from '@testing-library/react-hooks'
import { Contract } from 'ethers'
import { CallResult } from '../../helpers'

export type HookResult = {
  [key: string]: CallResult<Contract, string>
}

export const getResultProperty = <T extends HookResult>(result: RenderResult<T>, property: keyof T) => {
  return result.current?.[property]?.value?.[0]
}

export const getResultPropertyError = <T extends HookResult>(result: RenderResult<T>, property: keyof T) => {
  return result.current?.[property]?.error
}
