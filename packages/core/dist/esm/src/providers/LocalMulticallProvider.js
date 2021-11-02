import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { isLocalChain } from '../helpers';
import { useEthers } from '../hooks';
import { useBlockNumber } from './blockNumber';
import { useConfig, useUpdateConfig } from './config';
import multicallABI from '../constants/abi/MultiCall.json';
import { deployContract } from '../helpers/contract';
var LocalMulticallState;
(function (LocalMulticallState) {
    LocalMulticallState[LocalMulticallState["Unknown"] = 0] = "Unknown";
    LocalMulticallState[LocalMulticallState["NonLocal"] = 1] = "NonLocal";
    LocalMulticallState[LocalMulticallState["Deploying"] = 2] = "Deploying";
    LocalMulticallState[LocalMulticallState["Deployed"] = 3] = "Deployed";
    LocalMulticallState[LocalMulticallState["Error"] = 4] = "Error";
})(LocalMulticallState || (LocalMulticallState = {}));
export function LocalMulticallProvider({ children }) {
    const updateConfig = useUpdateConfig();
    const { multicallAddresses } = useConfig();
    const { library, chainId } = useEthers();
    const [localMulticallState, setLocalMulticallState] = useState(LocalMulticallState.Unknown);
    const [multicallBlockNumber, setMulticallBlockNumber] = useState();
    const blockNumber = useBlockNumber();
    useEffect(() => {
        if (!library || !chainId) {
            setLocalMulticallState(LocalMulticallState.Unknown);
        }
        else if (!isLocalChain(chainId)) {
            setLocalMulticallState(LocalMulticallState.NonLocal);
        }
        else if (multicallAddresses && multicallAddresses[chainId]) {
            setLocalMulticallState(LocalMulticallState.Deployed);
        }
        else if (localMulticallState !== LocalMulticallState.Deploying) {
            const signer = library.getSigner();
            if (!signer) {
                setLocalMulticallState(LocalMulticallState.Error);
                return;
            }
            setLocalMulticallState(LocalMulticallState.Deploying);
            const deployMulticall = async () => {
                try {
                    const { contractAddress, blockNumber } = await deployContract(multicallABI, signer);
                    updateConfig({ multicallAddresses: { [chainId]: contractAddress } });
                    setMulticallBlockNumber(blockNumber);
                    setLocalMulticallState(LocalMulticallState.Deployed);
                }
                catch (_a) {
                    setLocalMulticallState(LocalMulticallState.Error);
                }
            };
            deployMulticall();
        }
    }, [library, chainId]);
    const awaitingMulticallBlock = multicallBlockNumber && blockNumber && blockNumber < multicallBlockNumber;
    if (localMulticallState === LocalMulticallState.Deploying ||
        (localMulticallState === LocalMulticallState.Deployed && awaitingMulticallBlock)) {
        return _jsx("div", { children: "Deploying multicall..." }, void 0);
    }
    else if (localMulticallState === LocalMulticallState.Error) {
        return _jsx("div", { children: "Error deploying multicall contract" }, void 0);
    }
    else {
        return _jsx(_Fragment, { children: children }, void 0);
    }
}
//# sourceMappingURL=LocalMulticallProvider.js.map