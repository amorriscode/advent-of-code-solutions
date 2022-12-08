const { parseInput, part1, part2 } = require('./index.js')
const { getExampleInput, getInput } = require('./input.js')

test('part 1 example', async () => {
  expect(part1(parseInput(await getExampleInput()))).toBe(7)
  expect(part1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
  expect(part1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
  expect(part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
  expect(part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
})

test('part 1 data', async () => {
  expect(part1(parseInput(await getInput()))).toBe(1238)
})

test('part 2 example', async () => {
  expect(part2(parseInput(await getExampleInput()))).toBe(19)
  expect(part2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23)
  expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23)
  expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29)
  expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26)
})

test('part 2 data', async () => {
  expect(part2(parseInput(await getInput()))).toBe(3037)
})
