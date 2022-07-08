import fs from 'fs'
import {ContractMethodNames} from './src/model/types'

const outDir = process.env.OUT_DIR ?? "./src/gen/hooks"
const inputDir = process.env.INPUT_DIR ?? './build-types'

import {ERC20__factory} from './build-typechain/types'

fs.mkdirSync(outDir, {recursive: true})

interface IFactories {
  [key: ContractMethodNames<any>]: any
}

const factories: IFactories = {
  ERC20: ERC20__factory,
}

Object.keys(factories).forEach((contractName) => {
  const filename = `${outDir}/${contractName}.ts`
  let output = ``
  console.log(`Processing ${contractName}`)
  const factory = factories[contractName]
  const Interface = factory.createInterface()

  const abi = factory.abi
  Object.keys(Interface.functions).forEach((fn) => {
    const functionName = fn.split('(')[0]
    const fnABI = abi.find((a: any) => a.name === functionName)
    if (fnABI?.stateMutability === 'view' && functionName === 'balanceOf') {
      output += `
        
        export const use${contractName}_${functionName} = () => {

        }

      `
      console.log(`use${contractName}_${functionName}`)
      // useDiamond[functionName] = function (): any {
      //   const contract = factory.connect(address, signer)
      //   const { value, error } =
      //     // eslint-disable-next-line react-hooks/rules-of-hooks
      //     useCall({
      //       contract: contract,
      //       method: functionName,
      //       args: [...(arguments as any)],
      //     }) ?? {}
      //   return value
      // }
    } else { // Non-View function
      // useDiamond[functionName] = useContractFunction(
      //   MyToken__factory.connect(address, signer),
      //   functionName as any
      // )
    }
  })
  fs.writeFileSync(filename, output)
})

// generate:
// export const useERC20 = {
//   allowance: useERC20_allowance,
//   ...
// }


// 1. take compiled ERC20 with typechain
// 2. Generate 1 view and 1 non-view
// 3. test them with existing tests

// for each contract in input
// for each method in contract (view and non-view)

// ERC20

// useERC20_transfer()  ==>  useContractFunction(erc20, 'transfer')
// useERC20_balanceOf()  ==>  useCall(erc20, 'balanceof')

// useERC20   useERC20['transfer']()
// useERC20   useERC20['balanceOf']()




// export {
//   useERC20_transfer,
//   useERC20_balanceOf,
//   useERC20
// }