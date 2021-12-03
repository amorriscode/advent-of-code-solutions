const { inputParser, part1, part2 } = require('./index.js')
const { example, data } = require('./input.js')

test('part 1 example', () => {
  expect(part1(inputParser(example))).toBe(198)
})

test('part 1 data', () => {
  expect(part1(inputParser(data))).toBe(3009600)
})

test('part 2 example', () => {
  expect(part2(inputParser(example))).toBe(230)
})

test('part 2 data', () => {
  expect(part2(inputParser(data))).toBe(6940518)
})
