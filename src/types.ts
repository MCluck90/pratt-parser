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
