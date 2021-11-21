import { FullConfig, Config } from '../..'
import _merge from 'lodash/merge'

export function configReducer(state: FullConfig, action: Config): FullConfig {
  return _merge({}, state, action)
}
