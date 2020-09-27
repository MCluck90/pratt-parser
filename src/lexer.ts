import { Token, TokenType } from './types'

export class Lexer {
  private tokens: Token[]

  constructor(input: string) {
    this.tokens = input
      .split('')
      .filter((c) => !/\s/.test(c))
      .map((c) => {
        if (/[0-9a-zA-Z]/.test(c)) {
          return {
            type: TokenType.Atom,
            value: c,
          }
        }
        return {
          type: TokenType.Op,
          value: c,
        }
      })
  }

  next(): Token {
    return this.tokens.pop() || { type: TokenType.Eof }
  }

  peek(): Token {
    return this.tokens[this.tokens.length - 1] || { type: TokenType.Eof }
  }
}
