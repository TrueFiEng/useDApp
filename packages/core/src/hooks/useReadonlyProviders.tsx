import { JsonRpcProvider } from "@ethersproject/providers";
import { useEffect } from "react";
import { useReadonlyNetworks } from "../providers/network";

export function useReadonlyProviders(chainIds: number[]): Record<number, JsonRpcProvider | undefined> {
  const { providers, connect } = useReadonlyNetworks();
  
  useEffect(() => {
    for(const chainId of chainIds) {
      if(!providers[chainId]) {
        const canConnect = connect(chainId);
        if(!canConnect) {
          console.error(`No provider available for network: chainId=${chainId}`);
        }
      }
    }
  }, [chainIds])

  return providers;
}