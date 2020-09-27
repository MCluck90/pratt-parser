import { Lexer } from '../src/lexer'
import { Token, TokenType } from '../src/types'

test('Empty input only produces EOF', () => {
  const lexer = new Lexer('')
  expect(lexer.next().type).toBe(TokenType.Eof)
})

function assertAtom(token: Token, value: string) {
  if (token.type === TokenType.Atom) {
    expect(token.value).toBe(value)
  } else {
    expect(token.type).toBe(TokenType.Atom)
  }
}

function assertOp(token: Token, value: string) {
  if (token.type === TokenType.Op) {
    expect(token.value).toBe(value)
  } else {
    expect(token.type).toBe(TokenType.Op)
  }
}

function assertEof(token: Token) {
  expect(token.type).toBe(TokenType.Eof)
}

test('Produce valid token stream', () => {
  const lexer = new Lexer('1 + 2 * 3')
  assertAtom(lexer.next(), '1')
  assertOp(lexer.next(), '+')
  assertAtom(lexer.next(), '2')
  assertOp(lexer.next(), '*')
  assertAtom(lexer.next(), '3')
  assertEof(lexer.next())
})
