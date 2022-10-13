import { useMemo } from 'react';
import { Connector, useConfig, useConnector, useEthers } from '@usedapp/core';
import type { WalletConnectConnector } from '@usedapp/wallet-connect-connector';
import { isNotNullish } from '../utils/isNotNullish';
import {
  useInitialChainId,
  useRainbowKitChains,
} from './../components/RainbowKitProvider/RainbowKitChainContext';
import { Wallet, WalletInstance } from './Wallet';
import { addRecentWalletId, getRecentWalletIds } from './recentWalletIds';
import { metaMask } from './walletConnectors/metaMask/metaMask';
import { coinbase } from './walletConnectors/coinbase/coinbase';
import { walletConnect } from './walletConnectors/walletConnect/walletConnect';

export interface WalletConnector extends WalletInstance {
  ready?: boolean;
  connect?: () => Promise<void>;
  onConnecting?: (fn: () => void) => void;
  showWalletConnectModal?: () => void;
  recent: boolean;
  groupName: string;
}

const rainbowKitWalletsMap: Record<string, Wallet> = {
  'Metamask': metaMask({ chains: [] }),
  'CoinbaseWallet': coinbase({ chains: [], appName: 'Does not matter anyway' }),
  'WalletConnect': walletConnect({ chains: [] })
}

const walletIndices: Record<string, number> = {
  'Metamask': 0,
  'CoinbaseWallet': 1,
  'WalletConnect': 2
}

export function useWalletConnectors(): WalletConnector[] {
  const rainbowKitChains = useRainbowKitChains();
  const initialChainId = useInitialChainId();
  const { connectors } = useConfig();
  const defaultConnectors = useMemo(() => Object.values(connectors), [connectors]);
  const { activate } = useEthers();
  const { connector: controller } = useConnector();

  async function connectWallet(walletId: string, connector: Connector) {
    await activate(connector);
    addRecentWalletId(walletId);
    if (controller) {
      if (initialChainId && controller.chainId !== initialChainId) {
        await controller.switchNetwork(initialChainId);
      }
      const walletChainId = controller.chainId;
      if (walletChainId && !rainbowKitChains.find(({ id }) => id === walletChainId)) {
        await controller.switchNetwork(rainbowKitChains[0].id);
      }
    }
  }

  const MAX_RECENT_WALLETS = 3;
  const recentWallets: Connector[] = getRecentWalletIds()
    .map(walletId => connectors[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS);

  const groupedWallets: Connector[] = [
    ...recentWallets,
    ...defaultConnectors.filter(
      walletInstance => !recentWallets.includes(walletInstance)
    ),
  ];

  const walletConnectors: WalletConnector[] = [];

  groupedWallets.forEach((wallet: Connector) => {
    if (!wallet) {
      return;
    }

    const recent = getRecentWalletIds().includes(wallet.name);

    const getUriObject = () => {
      return wallet.name === 'WalletConnect' ? { getUri: async () => {
        return (wallet as WalletConnectConnector).getUri();
      } } : undefined
    }

    walletConnectors.push({
      ...rainbowKitWalletsMap[wallet.name],
      mobile: getUriObject(),
      qrCode: getUriObject(),
      connector: wallet as any,
      index: walletIndices[wallet.name],
      connect: () => connectWallet(wallet.name, wallet),
      groupName: wallet.name === 'Metamask' ? 'Popular' : 'More',
      ready: true,
      recent,
      showWalletConnectModal: wallet.name === 'WalletConnect'
        ? async () => {
            try {
              await connectWallet(
                wallet.name,
                wallet
              );
            } catch (err) {
              // @ts-expect-error
              const isUserRejection = err.name === 'UserRejectedRequestError';

              if (!isUserRejection) {
                throw err;
              }
            }
          }
        : undefined,
    });
  });

  return walletConnectors;
}
