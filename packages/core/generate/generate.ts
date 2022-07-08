import fs from 'fs'
import {ContractMethodNames} from '../src/model/types'

const outDir = process.env.OUT_DIR ?? "./src/gen/hooks"
const inputDir = process.env.INPUT_DIR ?? './build-types'

import {ERC20__factory} from '../build-typechain/types'
import { commonImports, imports } from './imports'

fs.mkdirSync(outDir, {recursive: true})

interface IFactories {
  [key: ContractMethodNames<any>]: any
}

const factories: IFactories = {
  ERC20: ERC20__factory,
}

Object.keys(factories).forEach((contractName) => {
  const filename = `${outDir}/${contractName}.ts`
  let output = commonImports + imports(contractName)
  console.log(`Processing ${contractName}`)
  const factory = factories[contractName]
  const Interface = factory.createInterface()

  const abi = factory.abi
  Object.keys(Interface.functions).forEach((fn) => {
    const functionName = fn.split('(')[0]
    const fnABI = abi.find((a: any) => a.name === functionName)
    if (fnABI?.stateMutability === 'view') {
      output += `
export const use${contractName}_${functionName} = (
  contractAddress: Falsy | string,
  args: Falsy | Params<${contractName}, '${functionName}'>,
  queryParams: QueryParams = {}
) => {
  return useCall(
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
export const use${contractName}_${functionName} = 'TODO'

`
    }
  })
  output += `
export const use${contractName} = {
  ${Object.keys(Interface.functions)
    .map(fn => fn.split('(')[0])
    .map(fn => `${fn}: use${contractName}_${fn}`)
    .join(",\n  ")}
}
`
  fs.writeFileSync(filename, output)
})
