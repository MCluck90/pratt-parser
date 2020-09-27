import { Token } from './types'

export class Lexer {
  private tokens: Token[]

  constructor(input: string) {
    this.tokens = input
      .split('')
      .filter((c) => !/\s/.test(c))
      .map((c) => {
        if (/[0-9a-zA-Z]/.test(c)) {
          return Token.Atom(c)
        }
        return Token.Op(c)
      })
      .reverse()
  }

  next(): Token {
    return this.tokens.pop() || Token.Eof()
  }

  peek(): Token {
    return this.tokens[this.tokens.length - 1] || Token.Eof()
  }
}
