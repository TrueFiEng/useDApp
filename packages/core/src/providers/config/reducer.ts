import { FullConfig, Config } from '../..'

export function configReducer(state: FullConfig, action: Config): FullConfig {
  const readOnlyUrls = { ...state.readOnlyUrls, ...action.readOnlyUrls }
  const multicallAddresses = { ...state.multicallAddresses, ...action.multicallAddresses }
  const supportedChains = { ...state.supportedChains, ...action.supportedChains }
  const notifications = { ...state.notifications, ...action.notifications }
  return { ...state, ...action, readOnlyUrls, multicallAddresses, supportedChains, notifications }
}
