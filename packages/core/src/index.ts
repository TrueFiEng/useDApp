// NOTE: We explicitly export the symbols in the root index.ts file to have better control over package's public API.

export type { Chain, Config, FullConfig, MulticallAddresses, NodeUrls, QueryParams, LogQueryParams } from './constants'
export {
  ChainId,
  BNB,
  BUSD,
  DEFAULT_SUPPORTED_CHAINS,
  Dai,
  ERC20,
  ERC20Interface,
  ERC20Mock,
  ERC20MockInterface,
  Ether,
  KovanDai,
  KovanEther,
  MultiCall,
  MultiCall2,
  MultiCall2ABI,
  MultiCallABI,
  NATIVE_CURRENCY,
  TestBNB,
  TestBUSD,
} from './constants'
export type {
  DAppProviderProps,
  AddNotificationPayload,
  RemoveNotificationPayload,
  ChainState,
  Notification,
  Notifications,
  RawCall,
  RawCallResult,
  State,
  StoredTransaction,
  StoredTransactions,
} from './providers'
export { DAppProvider, getStoredTransactionState, multicall, multicall2, useConnector } from './providers'
export type { Connector, ConnectorController, ConnectorUpdateData } from './providers'
export type { TypedFilter, Call, ContractCall, Web3Ethers, TokenList } from './hooks'
export {
  useBlockMeta,
  useLogs,
  useRawLogs,
  useBlockNumber,
  useBlockNumbers,
  useCall,
  useCalls,
  useConfig,
  useUpdateConfig,
  useContractCall,
  useContractCalls,
  useChainCall,
  useChainCalls,
  useChainMeta,
  useChainState,
  useContractFunction,
  useEtherBalance,
  useEthers,
  useGasPrice,
  useLookupAddress,
  useMulticallAddress,
  useNotifications,
  useSendTransaction,
  useToken,
  useTokenAllowance,
  useTokenBalance,
  useTokenList,
  useTransactions,
  useRawCall,
  useRawCalls,
  useResolveName,
} from './hooks'
export type {
  CurrencyFormatOptions,
  TransactionOptions,
  TransactionState,
  TransactionStatus,
  Falsy,
  Params,
} from './model'
export { Currency, CurrencyValue, FiatCurrency, NativeCurrency, Token, transactionErrored } from './model'
export type { LogsResult, CallResult } from './helpers'
export * from './model/chain'
export {
  isLocalChain,
  isTestChain,
  addressEqual,
  compareAddress,
  shortenAddress,
  shortenIfAddress,
  shortenIfTransactionHash,
  shortenTransactionHash,
  getChainName,
  getExplorerAddressLink,
  getExplorerTransactionLink,
  Event as ConnectorEvent,
} from './helpers'
export { MetamaskConnector } from './providers/network/connectors/implementations/metamask'
export { InjectedConnector } from './providers/network/connectors/implementations/injected'
export { CoinbaseWalletConnector } from './providers/network/connectors/implementations/coinbase'
