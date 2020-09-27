export enum TokenType {
  Atom,
  Op,
  Eof,
}

export type Token =
  | {
      type: TokenType.Atom
      value: string
    }
  | {
      type: TokenType.Op
      value: string
    }
  | {
      type: TokenType.Eof
    }

export const Token = {
  Atom(value: string): Token {
    return {
      type: TokenType.Atom,
      value,
    }
  },
  Op(value: string): Token {
    return {
      type: TokenType.Op,
      value,
    }
  },
  Eof(): Token {
    return {
      type: TokenType.Eof,
    }
  },
}

export enum SType {
  Atom,
  Cons,
}

export type S =
  | {
      type: SType.Atom
      value: string
    }
  | {
      type: SType.Cons
      value: [string, S[]]
    }

export const S = {
  Atom(value: string): S {
    return {
      type: SType.Atom,
      value,
    }
  },
  Cons(head: string, rest: S[]): S {
    return {
      type: SType.Cons,
      value: [head, rest],
    }
  },
}
