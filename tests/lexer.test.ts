import { Lexer } from '../src/lexer'
import { TokenType } from '../src/types'

test('Empty input only produces EOF', () => {
  const lexer = new Lexer('')
  expect(lexer.next().type).toBe(TokenType.Eof)
})
