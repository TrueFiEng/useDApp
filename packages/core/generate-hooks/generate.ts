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
    
    const functions = Interface.fragments.filter((f: any) => f.type === 'function')
    functions.forEach((fn: any) => {
      const functionName = fn.name
      if (['view', 'pure'].includes(fn.stateMutability)) {
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
        contract: new BaseContract(contractAddress, ${contractName}Interface) as ${contractName},
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
    contractAddress && new BaseContract(contractAddress, ${contractName}Interface) as ${contractName},
    '${functionName}',
    options
  )
}

`
      }
    })

    const events = Interface.fragments.filter((f: any) => f.type === 'event')
    console.log({
      event: Interface.fragments[2]
    })

    //write events
    events.forEach((event: any) => {
      const eventName = event.name
      output += `
export const use${contractName}_event_${eventName} = (
  contractAddress: Falsy | string,
  args: Falsy | TypedFilter<${contractName}, '${eventName}'>['args'],
  queryParams: QueryParams = {}
) => {
  return useLogs(
    contractAddress
      && {
        contract: new BaseContract(contractAddress, ${contractName}Interface),
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
  ${functions
    .map((fn: any) => `${fn.name}: use${contractName}_${fn.name}`)
    .join(",\n  ")},
  events: {
  ${events
    .map((event: any) => `  ${event.name}: use${contractName}_event_${event.name}`)
    .join(",\n  ")}
  }
}
`
    fs.writeFileSync(filename, output)
  })
}
