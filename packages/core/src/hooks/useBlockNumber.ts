import { useContext } from "react";
import { BlockNumberContext } from "../providers";

/**
 * @public
 */
 export function useBlockNumber(): number | undefined {
  return useContext(BlockNumberContext)
}
