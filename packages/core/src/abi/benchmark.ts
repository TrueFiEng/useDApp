export interface BenchResult {
  iterations: number
  timePerIter: bigint
  iterPerSec: bigint
}

export function bench(func: () => void): BenchResult {
  let totalElapsed = BigInt(0)
  let iterations = 0
  while (iterations++ < 10_000) {
    const before = process.hrtime.bigint()
    func()
    const after = process.hrtime.bigint()
    totalElapsed += after - before
    if (totalElapsed > BigInt(1_000_000_000)) {
      break
    }
  }

  const timePerIter = totalElapsed / BigInt(iterations)
  const iterPerSec = (BigInt(1_000_000_000) * BigInt(iterations)) / totalElapsed
  return { iterations, timePerIter, iterPerSec }
}

export function formatBench(result: BenchResult, label?: string) {
  console.log(
    `${label || 'bench'}: ${result.iterPerSec} iterations/sec, ${result.timePerIter} ns/iter, made ${
      result.iterations
    } iters`
  )
}
