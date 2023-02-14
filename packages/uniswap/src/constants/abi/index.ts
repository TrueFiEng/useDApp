import { utils } from 'ethers'
import UniswapV2Factory from './UniswapV2Factory.json'
import UniswapV2Pair from './UniswapV2Pair.json'

const UniswapFactoryInterface = new utils.Interface(UniswapV2Factory.abi)

export { UniswapV2Factory, UniswapFactoryInterface }

const UniswapPairInterface = new utils.Interface(UniswapV2Pair.abi)

export { UniswapV2Pair, UniswapPairInterface }
