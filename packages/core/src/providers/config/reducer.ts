import { FullConfig, Config } from '../..'
import merge from 'lodash.merge'

export function configReducer(state: FullConfig, action: Config): FullConfig {
  return merge({}, state, action)
}
