
// Workaround before support for conditional exports lands in typescript.
// https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/#packagejson-exports-imports-and-self-referencing

// @ts-ignore
export * from '@usedapp/core/testing'

export type {
  ChildrenProps,
  IdentityWrapper,
  MOCK_TOKEN_INITIAL_BALANCE,
  contractCallOutOfGasMock,
  deployMockToken,
  deployMulticall,
  getAdminWallet,
  getWaitUtils,
  mineBlock,
  renderWeb3Hook,
  renderWeb3HookOptions,
  sleep,
  waitUntil,
} from '@usedapp/core/dist/cjs/src/testing'