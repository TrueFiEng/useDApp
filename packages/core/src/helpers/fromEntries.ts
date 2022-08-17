/**
 * More strictly typed version of `Object.fromEntries`.
 * Constructs an object from key-value pairs.
 */
export function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): { [key in K]: V } {
  return Object.fromEntries(entries) as { [key in K]: V }
}
