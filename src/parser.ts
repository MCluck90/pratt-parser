import { Lexer } from './lexer'
import { S, TokenType } from './types'
import { badToken, matchToken } from './util'

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
    const [leftBindingPower, rightBindingPower] = infixBindingPower(op)
    if (leftBindingPower < minBindingPower) {
      break
    }

    lexer.next()
    const rhs = expressionBindingPower(lexer, rightBindingPower)

    lhs = S.Cons(op, [lhs, rhs])
  }

  return lhs
}

const infixBindingPower = (op: string): [number, number] => {
  switch (op) {
    case '+':
    case '-':
      return [1, 2]

    case '*':
    case '/':
      return [3, 4]

    default:
      throw new Error(`Bad op: ${op}`)
  }
}
