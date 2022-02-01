export function fromEntries<K extends string | number | symbol, V>(entries: [K, V][]): { [key in K]: V } {
  return Object.fromEntries(entries) as { [key in K]: V }
}
