const { inputParser, part1, part2 } = require('./index.js')
const dedent = require('dedent')
const { data, example } = require('./input.js')

test('part1 passes examples', () => {
  expect(part1(inputParser(example))).toBe(7)
  expect(part1(inputParser(data))).toBe(1184)
})

test('part2 passes examples', () => {
  expect(part2(inputParser(example))).toBe(5)
  expect(part2(inputParser(data))).toBe(1158)
})
