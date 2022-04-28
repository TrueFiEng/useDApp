import { useContext } from "react";
import { BlockNumbersContext } from "../providers";

/**
 * @public
 */
 export function useBlockNumbers() {
  return useContext(BlockNumbersContext)
}
