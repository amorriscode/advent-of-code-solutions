const { inputParser, part1, part2 } = require('./index.js')
const { example, getInput } = require('./input.js')

test('part 1 example', () => {
  expect(part1(inputParser(example))).toBe(24000)
})

test('part 1 data', async () => {
  expect(part1(inputParser(await getInput()))).toBe(67658)
})

test('part 2 example', () => {
  expect(part2(inputParser(example))).toBe(45000)
})

test('part 2 data', async () => {
  expect(part2(inputParser(await getInput()))).toBe(200158)
})
