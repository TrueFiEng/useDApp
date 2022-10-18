/**
 * Result of a {@link useRawCall} query.
 *
 * It is `undefined` when call didn't return yet or object `{ success: boolean, value: string }` if it did.
 *
 * - `success` - boolean indicating whether call was successful or not,
 * - `value` - encoded result when success is `true` or encoded error message when success is `false`.
 *
 * @public
 */
export type RawCallResult =
  | {
      value: string
      success: boolean
    }
  | undefined

export type ChainState = {
  [address: string]:
    | {
        [data: string]: RawCallResult
      }
    | undefined
}
