export const stringify = (value: unknown): string => {
  return JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v.toString() : v);
};