export function shortenString(str: string) {
  return str.substring(0, 6) + '...' + str.substring(str.length - 4)
}

/**
 * Determines whether two objects are equal using a deep comparison. Null and undefined are considered equal. Arrays
 * with the same elements are not considered equal if they are in different orders.
 * @param obj1 The first object to compare.
 * @param obj2 The second object to compare.
 * @returns True if the objects are deep equal, false otherwise.
 */
export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true

  if (obj1 == null || obj2 == null) return obj1 == obj2

  if (isPrimitive(obj1) && isPrimitive(obj2))
    // compare primitives
    return obj1 === obj2

  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

  // compare objects with same number of keys
  for (const key in obj1) {
    if (!(key in obj2)) return false //other object doesn't have this prop
    if (!deepEqual(obj1[key], obj2[key])) return false
  }

  return true
}

export function isPrimitive(obj: any) {
  return obj !== Object(obj)
}
