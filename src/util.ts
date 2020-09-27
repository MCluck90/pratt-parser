import { S, SType } from './types'

export const format = (s: S): string => {
  switch (s.type) {
    case SType.Atom:
      return s.value

    case SType.Cons:
      const [head, rest] = s.value
      let output = `(${head}`
      for (const value of rest) {
        output += ` ${format(value)}`
      }
      return `${output})`
  }
}
