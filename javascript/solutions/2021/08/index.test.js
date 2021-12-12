const { inputParser, part1, part2 } = require('./index.js')
const { example, data } = require('./input.js')

test('part 1 data', () => {
  expect(part1(inputParser(data))).toBe(383)
})

test('part 2 data', () => {
  expect(part2(inputParser(data))).toBe(998900)
})
