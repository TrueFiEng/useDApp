import { useContext } from "react";
import { BlockNumbersContext } from "../providers";

/**
 * Get the current block numbers of all observed chains.
 * Will update automatically when new blocks are mined.
 * @public
 */
 export function useBlockNumbers() {
  return useContext(BlockNumbersContext)
}
