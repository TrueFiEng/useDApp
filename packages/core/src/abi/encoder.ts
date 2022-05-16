export type Encoder = (...args: any[]) => string

export interface AbiParam {
  name: string
  type: string
  components?: AbiParam[]
}

export interface FunctionAbi {
  name: string
  inputs: AbiParam[]
  outputs: AbiParam[]
}

export function createEncoder(fragment: FunctionAbi): Encoder {
  return codegen(fragment.inputs.map(i => i.name), c => {
    function paramExtraSize(param: AbiParam) {
      
    }


    c`let res = '0x';`
    for(const input of fragment.inputs) {
      switch(input.type) {
        case 'bool':
          c`res += ${input.name} ? '0000000000000000000000000000000000000000000000000000000000000001' : '0000000000000000000000000000000000000000000000000000000000000000';`
        case 'address':
          c`res += '000000000000000000000000' + ${input.name};`;
      }
    }

    c`return 'foo'`;
  })
}


function codegen(args: string[], gen: (c: (parts: TemplateStringsArray, ...args: string[]) => void) => void): (...args: any[]) => any {
  let code = ''
  gen((parts, ...args) => {
    code += parts.map((s, i) => s + (args[i] ?? '')).join() + '\n'
  })

  return Function(...args, code) as any
}