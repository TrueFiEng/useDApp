import { useEffect, useState } from 'react';
import { useEthers } from './useEthers';
export function useTokenList(tokenListURI, overrideChainId, tags) {
    const { chainId: providerChainId } = useEthers();
    const [tokenList, setTokenList] = useState();
    const chainId = overrideChainId || providerChainId;
    useEffect(() => {
        fetch(tokenListURI)
            .then(async (response) => {
            if (response.ok) {
                const { name, logoURI, tokens } = await response.json();
                setTokenList({
                    name,
                    logoURI,
                    tokens: tokens.filter((token) => {
                        const sameChainId = token.chainId === chainId;
                        if (!tags) {
                            return sameChainId;
                        }
                        return sameChainId && token.tags && token.tags.some((tag) => tags.includes(tag));
                    }),
                });
            }
            else {
                const errorMessage = await response.text();
                return Promise.reject(new Error(errorMessage));
            }
        })
            .catch((err) => {
            console.log(err);
            setTokenList(undefined);
        });
    }, [tokenListURI, chainId]);
    return tokenList;
}
//# sourceMappingURL=useTokenList.js.map