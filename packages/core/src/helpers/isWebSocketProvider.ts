import { providers } from 'ethers'

export const isWebSocketProvider = (provider: any) => {
  return provider instanceof providers.WebSocketProvider || !!provider._websocket // Could be a different instance of ethers.
}
