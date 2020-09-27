import { Lexer } from './lexer'
import { S, TokenType } from './types'
import { badToken, matchToken, todo } from './util'

export const expression = (input: string): S => {
  const lexer = new Lexer(input)
  return expressionBindingPower(lexer, 0)
}

export const expressionBindingPower = (
  lexer: Lexer,
  minBindingPower: number
): S => {
  let lhs = matchToken<S>(lexer.next(), {
    Atom: (token) => S.Atom(token.value),
    Op: (token) => {
      if (token.value === '(') {
        const lhs = expressionBindingPower(lexer, 0)
        const next = lexer.next()
        return matchToken<S>(next, {
          Op: (token) => {
            if (token.value !== ')') {
              throw new Error(`Bad op: ${token.value}`)
            }
            return lhs
          },
          _: badToken,
        })
      }

      const op = token.value
      const [, rightBindingPower] = prefixBindingPower(op)
      const rhs = expressionBindingPower(lexer, rightBindingPower)
      return S.Cons(op, [rhs])
    },
    _: badToken,
  })

  while (true) {
    const next = lexer.peek()
    if (next.type === TokenType.Eof) {
      break
    }

    const op = matchToken<string>(next, {
      Op: (token) => token.value,
      _: badToken,
    })

    const postfix = postfixBindingPower(op)
    if (postfix !== null) {
      const [leftBindingPower] = postfix
      if (leftBindingPower < minBindingPower) {
        break
      }

      lexer.next()

      if (op === '[') {
        const rhs = expressionBindingPower(lexer, 0)
        const next = lexer.next()
        if (next.type === TokenType.Op && next.value !== ']') {
          throw new Error(`Bad op: ${next.value}`)
        } else if (next.type !== TokenType.Op) {
          badToken(next)
        }

        lhs = S.Cons(op, [lhs, rhs])
      } else {
        lhs = S.Cons(op, [lhs])
      }
      continue
    }

    const infix = infixBindingPower(op)
    if (infix !== null) {
      const [leftBindingPower, rightBindingPower] = infix
      if (leftBindingPower < minBindingPower) {
        break
      }

      lexer.next()
      const rhs = expressionBindingPower(lexer, rightBindingPower)

      lhs = S.Cons(op, [lhs, rhs])
      continue
    }

    break
  }

  return lhs
}

const prefixBindingPower = (op: string): [undefined, number] => {
  switch (op) {
    case '+':
    case '-':
      return [undefined, 5]

    default:
      throw new Error(`Bad op: ${op}`)
  }
}

const infixBindingPower = (op: string): [number, number] | null => {
  switch (op) {
    case '+':
    case '-':
      return [1, 2]

    case '*':
    case '/':
      return [3, 4]

    case '.':
      return [10, 9]

    default:
      return null
  }
}

const postfixBindingPower = (op: string): [number, undefined] | null => {
  switch (op) {
    case '!':
    case '[':
      return [7, undefined]

    default:
      return null
  }
}
