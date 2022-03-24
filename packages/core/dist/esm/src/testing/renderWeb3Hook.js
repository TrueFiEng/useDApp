import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MockProvider } from '@ethereum-waffle/provider';
import { renderHook } from '@testing-library/react-hooks';
import { BlockNumberProvider, NetworkProvider, NetworkActivator, MultiChainStateProvider } from '../providers';
import { deployMulticall, getWaitUtils, IdentityWrapper, mineBlock } from './utils';
import { BlockNumbersProvider } from '../providers/blockNumber/blockNumbers';
import { ReadonlyNetworksProvider } from '../providers/network';
export const renderWeb3Hook = async (hook, options) => {
    var _a, _b, _c, _d, _e;
    const provider = (options === null || options === void 0 ? void 0 : options.mockProvider) || new MockProvider();
    provider.pollingInterval = (_b = (_a = options === null || options === void 0 ? void 0 : options.mockProviderOptions) === null || _a === void 0 ? void 0 : _a.pollingInterval) !== null && _b !== void 0 ? _b : 200;
    const { chainId } = await provider.getNetwork();
    const multicallAddresses = await deployMulticall(provider, chainId);
    // In some occasions the block number lags behind.
    // It leads to a situation where we try to read state of a block before the multicall contract is deployed,
    // and it results in a failed call. So we force the provider to catch up on the block number here.
    await provider.getBlockNumber();
    const UserWrapper = (_d = (_c = options === null || options === void 0 ? void 0 : options.renderHook) === null || _c === void 0 ? void 0 : _c.wrapper) !== null && _d !== void 0 ? _d : IdentityWrapper;
    const { result, waitForNextUpdate, rerender, unmount } = renderHook(hook, {
        wrapper: (wrapperProps) => (_jsx(NetworkProvider, { children: _jsxs(ReadonlyNetworksProvider, Object.assign({ providerOverrides: { [chainId]: provider } }, { children: [_jsx(NetworkActivator, { providerOverride: provider }), _jsx(BlockNumberProvider, { children: _jsx(BlockNumbersProvider, { children: _jsx(MultiChainStateProvider, Object.assign({ multicallAddresses: multicallAddresses }, { children: _jsx(UserWrapper, Object.assign({}, wrapperProps)) })) }) })] })) })),
        initialProps: (_e = options === null || options === void 0 ? void 0 : options.renderHook) === null || _e === void 0 ? void 0 : _e.initialProps,
    });
    return Object.assign({ result,
        provider, mineBlock: async () => mineBlock(provider), rerender,
        unmount,
        // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
        waitForNextUpdate }, getWaitUtils(result));
};
//# sourceMappingURL=renderWeb3Hook.js.map