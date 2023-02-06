import * as fs from 'fs'
import * as path from 'path'
import { commonImports, imports } from './imports'

export async function generate() {
  if (!process.env.USEDAPP_TYPES_DIR) throw new Error('Missing USEDAPP_TYPES_DIR')
  if (!process.env.USEDAPP_OUT_DIR) throw new Error('Missing USEDAPP_OUT_DIR')

  const typesDir = path.join(process.cwd(), process.env.USEDAPP_TYPES_DIR)
  const outDir = path.join(process.cwd(),process.env.USEDAPP_OUT_DIR)

  const factories = require(typesDir).factories

  fs.mkdirSync(outDir!, {recursive: true})

  Object.keys(factories).forEach((factoryName) => {
    const contractName = factoryName.split('_')[0]
    const filename = `${outDir}/${contractName}.ts`
    let output = commonImports + imports({typesDir, outDir, contractName})
    console.log(`Processing ${contractName}`)
    const factory = factories[factoryName]
    const Interface = factory.createInterface()
    
    const abi = factory.abi
    Object.keys(Interface.functions).forEach((fn) => {
      const functionName = fn.split('(')[0]
      const fnABI = abi.find((a: any) => a.name === functionName)
      if (['view', 'pure'].includes(fnABI?.stateMutability)) {
        output += `
export const use${contractName}_${functionName} = (
  contractAddress: Falsy | string,
  args: Falsy | Params<${contractName}, '${functionName}'>,
  queryParams: QueryParams = {}
) => {
  return useCall<${contractName}, '${functionName}'>(
    contractAddress
      && args
      && {
        contract: new Contract(contractAddress, ${contractName}Interface) as ${contractName},
        method: '${functionName}',
        args
      }, queryParams
  )
}

`
      } else { // Non-View function
        output += `
export const use${contractName}_${functionName} = (
  contractAddress: Falsy | string,
  options?: TransactionOptions
) => {
  return useContractFunction<${contractName}, '${functionName}'>(
    contractAddress && new Contract(contractAddress, ${contractName}Interface) as ${contractName},
    '${functionName}',
    options
  )
}

`
      }
    })

    //write events
    Object.keys(Interface.events).forEach((event) => {
      const eventName = event.split('(')[0]
      output += `
export const use${contractName}_event_${eventName} = (
  contractAddress: Falsy | string,
  args: Falsy | TypedFilter<${contractName}, '${eventName}'>['args'],
  queryParams: QueryParams = {}
) => {
  return useLogs(
    contractAddress
      && {
        contract: new Contract(contractAddress, ${contractName}Interface),
        event: '${eventName}',
        args: args || [],
      },
    queryParams
  )
}

`
    })
    output += `
export const use${contractName} = {
  ${Object.keys(Interface.functions)
    .map(fn => fn.split('(')[0])
    .map(fn => `${fn}: use${contractName}_${fn}`)
    .join(",\n  ")},
  events: {
  ${Object.keys(Interface.events)
    .map(event => event.split('(')[0])
    .map(event => `  ${event}: use${contractName}_event_${event}`)
    .join(",\n  ")}
  }
}
`
    fs.writeFileSync(filename, output)
  })
}
