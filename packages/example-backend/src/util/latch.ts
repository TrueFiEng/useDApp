//
// Copyright 2020 DXOS.org
//

/**
 * Returns a callback and a promise that's resolved when the callback is called.
 */
export const latch = <T>() => {
  let callback: (value: T) => void;
  const promise = new Promise<T>((resolve) => {
    callback = resolve;
  });

  return [
    promise,
    (value: T) => callback(value)
  ] as const;
};
