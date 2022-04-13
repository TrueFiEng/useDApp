export type Assertions<S extends {}> = { [K in keyof S]: string }

export function validateArguments<S extends {}>(args: S, assertions: Assertions<S>): void {
  for(const key of Object.getOwnPropertyNames(args) as (keyof S)[]) {
    if(typeof args[key] !== assertions[key]) {
      throw new Error(`Expected "${key}" to be of type "${assertions[key]}", got "${args[key]}" instead.`)
    }
  }
}