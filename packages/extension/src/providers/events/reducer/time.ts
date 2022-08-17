export function timestampToTime(timestamp: number) {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const ms = date.getMilliseconds().toString().padStart(3, '0')
  return `${hours}:${minutes}:${seconds}.${ms}`
}

export function offsetToTime(initTimestamp: number, timestamp: number) {
  const sign = initTimestamp > timestamp ? '-' : '+'
  const value = Math.abs(initTimestamp - timestamp)
  const minutes = Math.floor(value / (60 * 1000))
    .toString()
    .padStart(2, '0')
  const seconds = (Math.floor(value / 1000) % 60).toString().padStart(2, '0')
  const ms = (value % 1000).toString().padStart(3, '0')
  return `${sign}${minutes}:${seconds}.${ms}`
}
