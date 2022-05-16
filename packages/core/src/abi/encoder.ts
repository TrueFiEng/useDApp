import { Interface } from "@ethersproject/abi"

export type Encoder = (...args: any[]) => string

export interface AbiParam {
  name: string
  type: string
  components?: AbiParam[]
  internalType?: string
}

export interface FunctionAbi {
  name: string
  inputs: AbiParam[]
  outputs: AbiParam[]
}

export function createEncoder(fragment: FunctionAbi): Encoder {
  const sighash = new Interface([fragment]).getSighash(fragment.name)
  const inputEncoder = createTupleEncoder(fragment.inputs)
  return codegen(fragment.inputs.map(i => i.name), c => {
    c`return '${sighash}' + ${ref(inputEncoder)}(${fragment.inputs.map(i => i.name).join(', ')});`
  })
}

const encodeUint = (uint: number) => uint.toString(16).padStart(64, '0');

function createTupleEncoder(components: AbiParam[]): Encoder {
  return codegen(components.map(c => c.name), c => {
    c`const bufLength = (buf) => (buf.length - 2) / 2;`;
    c`const bufPaddedLength = (buf) => Math.ceil(bufLength(buf) / 32) * 32;`

    c`let head = '', tail = '';`
    const headLength = components.length * 0x20

    for(let i = 0; i < components.length; i++) {
      c`// ${components[i].internalType ?? components[i].type} ${components[i].name}`
      switch(components[i].type) {
        case 'bool':
          c`head += ${components[i].name} ? '0000000000000000000000000000000000000000000000000000000000000001' : '0000000000000000000000000000000000000000000000000000000000000000';`
          break;
        case 'address':
          c`head += '000000000000000000000000' + ${components[i].name}.slice(2).toLowerCase();`;
          break;
        case 'bytes':
          c`head += ${ref(encodeUint)}(${headLength} + tail.length / 2);`
          c`tail += ${ref(encodeUint)}(bufLength(${components[i].name}));`
          c`tail += ${components[i].name}.slice(2).padEnd(bufPaddedLength(${components[i].name}) * 2, '0')`
          break;
        case 'tuple[]':
          const subEncoder = createArrayEncoder(components[i])
          c`head += ${ref(encodeUint)}(${headLength} + tail.length / 2);`
          c`tail += ${ref(subEncoder)}(${components[i].name})`
          break;
      }
    }
    c`return head + tail;`
  })
}

function createArrayEncoder(elementType: AbiParam) {
  return codegen(['array'], c => {
    const elementEncoder = createTupleEncoder(elementType.components!) // TODO: Hardcoded only for tuple arrays
    c`let head = '', tail = '';`
    c`const baseOffset = array.length * 0x20`

    c`head += ${ref(encodeUint)}(array.length);`

    c`for(let i = 0; i < array.length; i++) {`
    c`  head += ${ref(encodeUint)}(baseOffset + tail.length / 2)`
    c`  tail += ${ref(elementEncoder)}(...array[i])`
    c`}`
    
    c`return head + tail;`
  })
}

const Ref = Symbol('Ref')

interface Ref {
  [Ref]: true
  value: any
}

function ref(value: any): Ref {
  return {
    [Ref]: true,
    value
  }
}

function isRef(value: any): value is Ref {
  return value[Ref] === true;
}

function codegen(args: string[], gen: (c: (parts: TemplateStringsArray, ...args: any[]) => void) => void, ctx: Record<string, any> = {}): (...args: any[]) => any {
  const newCtx = { ...ctx }
  let nextAnnon = 1;

  let buf = ''
  gen((parts, ...args) => {
    const preprocessArg = (arg: any) => {
      if(isRef(arg)) {
        const name = `anon${nextAnnon++}`;
        newCtx[name] = arg.value;
        return name
      } else {
        return arg;
      }
    }
    buf += parts.map((s, i) => s + (i < args.length ? preprocessArg(args[i]) : '')).join('') + '\n'
  })

  const code = `return (${args.join(', ')}) => {\n${buf}\n}`

  // console.log(code)

  return Function(...Object.keys(newCtx), code)(...Object.values(newCtx))
}