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

test('function composition operator', () => {
  let s = expression('f . g . h')
  expect(format(s)).toBe('(. f (. g h))')

  s = expression('1 + 2 + f . g . h * 3 * 4')
  expect(format(s)).toBe('(+ (+ 1 2) (* (* (. f (. g h)) 3) 4))')
})

test('unary operators', () => {
  let s = expression('--1 * 2')
  expect(format(s)).toBe('(* (- (- 1)) 2)')

  s = expression('--f . g')
  expect(format(s)).toBe('(- (- (. f g)))')
})

test('postfix operator', () => {
  let s = expression('-9!')
  expect(format(s)).toBe('(- (! 9))')

  s = expression('f . g !')
  expect(format(s)).toBe('(! (. f g))')
})

test('parenthesized expressions', () => {
  const s = expression('(((0)))')
  expect(format(s)).toBe('0')
})

test('array indexing', () => {
  const s = expression('x[0][1]')
  expect(format(s)).toBe('([ ([ x 0) 1)')
})
