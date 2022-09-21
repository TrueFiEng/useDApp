import { useEthers } from '@usedapp/core';
import { useAuthenticationStatus } from '../components/RainbowKitProvider/AuthenticationContext';

export type ConnectionStatus =
  | 'disconnected'
  | 'loading'
  | 'unauthenticated'
  | 'connected';

export function useConnectionStatus(): ConnectionStatus {
  const authenticationStatus = useAuthenticationStatus();
  const { account } = useEthers();

  if (!account) {
    return 'disconnected';
  }

  if (!authenticationStatus) {
    return 'connected';
  }

  if (
    authenticationStatus === 'loading' ||
    authenticationStatus === 'unauthenticated'
  ) {
    return authenticationStatus;
  }

  return 'connected';
}
