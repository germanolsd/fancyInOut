import { interpolateLine } from '../src/fancyInOut.js'
import { test } from 'vitest'

test('interpolateLine', ({ expect }) => {
  const result = interpolateLine([10, 20], 0.5)
  expect(result).toEqual([2.5, 5])
})