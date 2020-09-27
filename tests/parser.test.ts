import { toEditorSettings } from 'typescript'
import { expression } from '../src/parser'
import { format } from '../src/util'

test('parse single digit', () => {
  const s = expression('1')
  expect(format(s)).toBe('1')
})

test('parse simple expression', () => {
  const s = expression('1 + 2 * 3')
  expect(format(s)).toBe('(+ 1 (* 2 3))')
})

test('complex expression', () => {
  const s = expression('a + b * c * d + e')
  expect(format(s)).toBe('(+ (+ a (* (* b c) d)) e)')
})
