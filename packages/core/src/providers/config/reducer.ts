import { FullConfig, Config } from '../..'

export function configReducer(state: FullConfig, action: Config): FullConfig {
  return { ...state, ...action }
}
