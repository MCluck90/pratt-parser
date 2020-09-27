import { S, SType, Token, TokenType } from './types'

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

export const badToken = <T>(token: Token): T => {
  throw new Error(`Bad token: ${TokenType[token.type]}`)
}

export const todo = <T>(): T => {
  throw new Error('not yet implemented')
}

type CreateTokenMatch<TType, TResult> = (
  token: Token & { type: TType }
) => TResult
type TokenPattern<T> = {
  Atom?: CreateTokenMatch<TokenType.Atom, T>
  Op?: CreateTokenMatch<TokenType.Op, T>
  Eof?: CreateTokenMatch<TokenType.Eof, T>
  _: (token: Token) => T
}

export const matchToken = <T>(token: Token, pattern: TokenPattern<T>): T => {
  const tokenTypeName = TokenType[token.type]
  const match = pattern[tokenTypeName]
  if (match) {
    return match(token)
  }

  return pattern._(token)
}
