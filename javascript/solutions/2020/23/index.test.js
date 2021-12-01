const { part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(part1(dedent`389125467`.split('').map(Number))).toBe('67384529')
})

test('part2 passes examples', () => {
  expect(part2(dedent`389125467`.split('').map(Number))).toBe('149245887792')
})
