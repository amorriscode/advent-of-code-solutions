const { parseInput, part1, part2 } = require('./index.js')
const { getInput } = require('./input.js')

test('part 1 example', async () => {
  expect(part1(parseInput(await getInput('example')))).toBe(8)
})

test('part 1 data', async () => {
  expect(part1(parseInput(await getInput('input')))).toBe(2285)
})

test('part 2 example', async () => {
  expect(part2(parseInput(await getInput('example')))).toBe(2286)
})

test('part 2 data', async () => {
  expect(part2(parseInput(await getInput('input')))).toBe(77021)
})
