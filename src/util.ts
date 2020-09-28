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

type TokenWithValue<T = Token> = T extends { value: any } ? T : never
type TokenTypeWithValue = TokenWithValue['type']

type TokenValue<
  TTokenType extends TokenTypeWithValue,
  TToken = Token & { type: TTokenType }
> = TToken extends { value: infer R } ? R : never

type CreateTokenMatch<TType extends TokenTypeWithValue, TResult> = (
  value: TokenValue<TType>
) => TResult

type TokenPattern<T> = {
  [K in TokenTypeWithValue]?: CreateTokenMatch<K, T>
} & {
  _: (token: Token) => T
}

export const matchToken = <T>(token: Token, pattern: TokenPattern<T>): T => {
  const match = pattern[token.type]
  if (match) {
    if ('value' in token) {
      return match(token.value)
    }
    return match()
  }

  return pattern._(token)
}
