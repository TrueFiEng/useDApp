import { Interface } from "@ethersproject/abi"
import { expect } from "chai"
import { Wallet } from "ethers"
import { writeFileSync } from "fs"
import { randomBytes } from "crypto"
import MultiCall2 from "../constants/abi/MultiCall2.json"
import { createEncoder } from "./encoder"

const ethersAbi = new Interface(MultiCall2.abi)

const calls = [
  ...[...Array(10)].map(() => ethersAbi.encodeFunctionData('getCurrentBlockGasLimit')),
  ...[...Array(10)].map((_, i) => ethersAbi.encodeFunctionData('getBlockHash', [i])),
]

const address = Wallet.createRandom().address;

function split(calldata: string) {
  // let res = calldata.slice(0, 10) + '\n'
  let res = '';
  let ptr = 0
  while(ptr < calldata.length) {
    res += calldata.slice(ptr, ptr + 64) + '\n'
    ptr += 64
  }
  return res
}

describe.only('Fast ABI encoder', () => {
  describe('Encoder', () => {
    it('can manually encode multicall v2', () => {
      const calldata = ethersAbi.encodeFunctionData('tryAggregate', [true, calls.map(calldata => [address, calldata])])
      
      const manual = encodeTryAggregate(true, calls.map(calldata => [address, calldata]))
      
      writeFileSync('expected.txt', split(calldata))
      writeFileSync('actual.txt', split(manual))

      expect(manual).to.eq(calldata)
    })

    it('can encode multicall v2 using codegen', () => {
      const calldata = ethersAbi.encodeFunctionData('tryAggregate', [true, calls.map(calldata => [address, calldata])])
      
      const encoder = createEncoder(MultiCall2.abi.find(f => f.name === 'tryAggregate')!)

      const encoded = encoder(true, calls.map(calldata => [address, calldata]))
      
      writeFileSync('expected.txt', split(calldata))
      writeFileSync('actual.txt', split(encoded))

      expect(encoded).to.eq(calldata)
    })

    it('bench ethers', () => {
      const callsLong = [...Array(20)].flatMap(() => calls)
      formatBench(bench(() => {
        ethersAbi.encodeFunctionData('tryAggregate', [true, callsLong.map(calldata => [address, calldata])])
      }))
    })

    it('bench manual', () => {
      const callsLong = [...Array(20)].flatMap(() => calls)
      formatBench(bench(() => {
        encodeTryAggregate(true, callsLong.map(calldata => [address, calldata]))
      }))
    })


    it('bench codegen', () => {
      const callsLong = [...Array(20)].flatMap(() => calls)
      const encoder = createEncoder(MultiCall2.abi.find(f => f.name === 'tryAggregate')!)
      formatBench(bench(() => {
        encoder(true, callsLong.map(calldata => [address, calldata]))
      }))
    })


    it('string concat', () => {
      formatBench(bench(() => {
        let res = ''
        for(let i = 0; i < 10000; i++) {
          res += 'foo'
        }
      }), 'append')

      formatBench(bench(() => {
        let res = ''
        for(let i = 0; i < 10000; i++) {
          res = 'foo' + res
        }
      }), 'prepend')

      formatBench(bench(() => {
        let res = ''
        for(let i = 0; i < 100; i++) {
          let res2 = ''
          for(let j = 0; j < 100; j++) {
            res2 += 'foo'
          }
          res += res2
        }
      }), 'nested')
    })
  })

  describe.only('Decoder', () => {
    const testData: [boolean, string][] = Array.from(Array(20).keys()).map(i => 
      [
        Math.random() < 0.5,
        '0x' + randomBytes((i + 1) * 8).toString('hex')
      ]
    );
    const encoded = ethersAbi.encodeFunctionResult('tryAggregate', [testData]);

    it('Can manually decode multicall v2', () => {
      const manual = decodeTryAggregate(encoded);
      expect(manual).to.deep.eq([testData]);
    });

    it('bench ethers', () => {
      formatBench(bench(() => {
        ethersAbi.decodeFunctionResult('tryAggregate', encoded);
      }))
    })

    it('bench manual', () => {
      formatBench(bench(() => {
        decodeTryAggregate(encoded);
      }))
    })
  });
})

const trueEncoded = '0'.repeat(63) + '1';
const falseEncoded = '0'.repeat(63) + '0';

const selector = ethersAbi.getSighash('tryAggregate') 

// function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) public view returns (tuple(bool success, bytes returnData)[])
function encodeTryAggregate(b: boolean, calls: [string, string][]) {
  const buffLength = (buf: string) => (buf.length - 2) / 2
  const bufPaddedLength = (buf: string) => Math.ceil(buffLength(buf) / 32) * 32
  const encodeUint = (uint: number) => uint.toString(16).padStart(64, '0')

  let res = selector;
  let dynamicOffset;

  // head params
  dynamicOffset = 0x40;
  res += b ? trueEncoded : falseEncoded;
  res += encodeUint(dynamicOffset)

  // array
  dynamicOffset = calls.length * 0x20
  res += encodeUint(calls.length)
  for(const call of calls) {
    res += encodeUint(dynamicOffset)
    dynamicOffset += 3 * 0x20 + bufPaddedLength(call[1])
  }

  // tuples
  for(const call of calls) {
    // address + calldata ptr
    dynamicOffset = 0x40;
    res += '000000000000000000000000' + call[0].slice(2).toLowerCase()
    res += encodeUint(dynamicOffset)

    // calldata
    res += buffLength(call[1]).toString(16).padStart(64, '0')
    res += call[1].slice(2).padEnd(bufPaddedLength(call[1]) * 2, '0')
  }

  return res
}

function decodeTryAggregate(calldata: string) {
  const errorMethodId = '0x08c379a0';
  if (calldata.startsWith(errorMethodId)) {
    throw new Error('Multicall2 aggregate: call failed');
  }
  calldata = calldata.slice(2); // 'remove 0x prefix'
  const decodeUint = (buf: string) => parseInt(buf, 16)
  const wordLength = 64;
  const getNumber = (offset: number) =>  decodeUint(calldata.slice(offset * wordLength, (offset + 1) * wordLength))
  const fail = () => { throw new Error('Invalid calldata') };

  let dynamicOffset = getNumber(0);
  if (dynamicOffset !== 0x20) {
    fail();
  }
  const arraySize = getNumber(1);
  const calls: [boolean, string][] = []
  for(let i = 0; i < arraySize; i++) {
    const callOffset = 2 * getNumber(i + 2) + 2 * wordLength;
    const pos = callOffset / wordLength;
    const successEncoded = getNumber(pos);
    if (successEncoded !== 1 && successEncoded !== 0) { 
      fail();
    }
    const success = successEncoded === 1;
    if (getNumber(pos + 1) !== 0x40) {
      fail();
    }
    const returnDataOffset = (pos + 3) * wordLength;
    const returnDataLength = getNumber(pos + 2);
    const returnData = calldata.slice(returnDataOffset, returnDataOffset + 2 * returnDataLength);
    const call: [boolean, string] = [
      success,
      '0x' + returnData
    ];
    calls.push(call);
  }
  return [calls]
}

interface BenchResult {
  iterations: number
  timePerIter: bigint;
  iterPerSec: bigint;
}

function bench(func: () => void): BenchResult {
  let totalElapsed = BigInt(0);
  let iterations = 0;
  while(iterations++ < 10_000) {
    const before = process.hrtime.bigint();
    func();
    const after = process.hrtime.bigint();
    totalElapsed += after - before;
    if(totalElapsed > BigInt(1_000_000_000)) {
      break;
    }
  }

  const timePerIter = totalElapsed / BigInt(iterations);
  const iterPerSec = BigInt(1_000_000_000) * BigInt(iterations) / totalElapsed;
  return { iterations, timePerIter, iterPerSec };
}

function formatBench(result: BenchResult, label?: string) {
  console.log(`${label || 'bench'}: ${result.iterPerSec} iterations/sec, ${result.timePerIter} ns/iter, made ${result.iterations} iters`);
}