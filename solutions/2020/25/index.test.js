const { inputParser, part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(
    part1(
      inputParser(
        dedent`5764801
          17807724`
      )
    )
  ).toBe(14897079)
})

test('part2 passes examples', () => {
  expect(part2()).toBe(undefined)
})
