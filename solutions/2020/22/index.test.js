const { part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(
    part1(
      dedent`Player 1:
  9
  2
  6
  3
  1
  
  Player 2:
  5
  8
  4
  7
  10`.split('\n\n')
    )
  ).toBe(306)
})

test('part2 passes examples', () => {
  expect(
    part1(
      dedent`Player 1:
      43
      19
      
      Player 2:
      2
      29
      14
      `.split('\n\n')
    )
  ).toBe(291)
})
