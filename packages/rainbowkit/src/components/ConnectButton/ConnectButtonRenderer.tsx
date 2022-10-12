import React, { ReactNode, useContext } from 'react';
import { useEthers, useEtherBalance, useConfig, useEnsAvatar, useLookupAddress } from '@usedapp/core';
import { useIsMounted } from '../../hooks/useIsMounted';
import { useRecentTransactions } from '../../transactions/useRecentTransactions';
import { useAsyncImage } from '../AsyncImage/useAsyncImage';
import {
  AuthenticationStatus,
  useAuthenticationStatus,
} from '../RainbowKitProvider/AuthenticationContext';
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
  useModalState,
} from '../RainbowKitProvider/ModalContext';
import { useRainbowKitChainsById } from '../RainbowKitProvider/RainbowKitChainContext';
import { ShowRecentTransactionsContext } from '../RainbowKitProvider/ShowRecentTransactionsContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { formatENS } from './formatENS';
import { utils } from 'ethers';

const noop = () => {};

export interface ConnectButtonRendererProps {
  children: (renderProps: {
    account?: {
      address: string;
      balanceDecimals?: number;
      balanceFormatted?: string;
      balanceSymbol?: string;
      displayBalance?: string;
      displayName: string;
      ensAvatar?: string;
      ensName?: string;
      hasPendingTransactions: boolean;
    };
    chain?: {
      hasIcon: boolean;
      iconUrl?: string;
      iconBackground?: string;
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    mounted: boolean;
    authenticationStatus?: AuthenticationStatus;
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
    accountModalOpen: boolean;
    chainModalOpen: boolean;
    connectModalOpen: boolean;
  }) => ReactNode;
}

export function ConnectButtonRenderer({
  children,
}: ConnectButtonRendererProps) {
  const mounted = useIsMounted();
  const { account, chainId } = useEthers();
  const { ensAvatar } = useEnsAvatar(account);
  const { ens: ensName } = useLookupAddress(account);
  const balance = useEtherBalance(account);
  const { networks, readOnlyUrls } = useConfig();
  const activeChain = networks?.find((network) => network.chainId === chainId);
  const rainbowkitChainsById = useRainbowKitChainsById();
  const authenticationStatus = useAuthenticationStatus() ?? undefined;

  const rainbowKitChain = chainId
    ? rainbowkitChainsById[chainId]
    : undefined;
  const chainIconUrl = rainbowKitChain?.iconUrl ?? undefined;
  const chainIconBackground = rainbowKitChain?.iconBackground ?? undefined;

  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);

  const showRecentTransactions = useContext(ShowRecentTransactionsContext);
  const hasPendingTransactions =
    useRecentTransactions().some(({ status }) => status === 'pending') &&
    showRecentTransactions;

  const displayBalance = balance
    ? `${abbreviateETHBalance(parseFloat(utils.formatEther(balance)))} ${
        activeChain?.nativeCurrency?.symbol ??'ETH'
      }`
    : undefined;

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { accountModalOpen, chainModalOpen, connectModalOpen } =
    useModalState();

  return (
    <>
      {children({
        account: account
          ? {
              address: account,
              balanceDecimals: 2,
              balanceFormatted: balance?.toString(),
              balanceSymbol: activeChain?.nativeCurrency?.symbol ?? 'ETH',
              displayBalance,
              displayName: ensName
                ? formatENS(ensName)
                : formatAddress(account),
              ensAvatar: ensAvatar ?? undefined,
              ensName: ensName ?? undefined,
              hasPendingTransactions,
            }
          : undefined,
        accountModalOpen,
        authenticationStatus,
        chain: activeChain
          ? {
              hasIcon: Boolean(chainIconUrl),
              iconBackground: chainIconBackground,
              iconUrl: resolvedChainIconUrl,
              id: activeChain.chainId,
              name: activeChain.chainName,
              unsupported: (readOnlyUrls && chainId) ? !readOnlyUrls[chainId] : true,
            }
          : undefined,
        chainModalOpen,
        connectModalOpen,
        mounted,
        openAccountModal: openAccountModal ?? noop,
        openChainModal: openChainModal ?? noop,
        openConnectModal: openConnectModal ?? noop,
      })}
    </>
  );
}

ConnectButtonRenderer.displayName = 'ConnectButton.Custom';
