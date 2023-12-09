import { parseInput, part1, part2 } from './index.js'
import { getInput } from '../../../lib'

test('part 1 example', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '03',
          fileName: 'example',
        })
      )
    )
  ).toBe(4361)
})

test('part 1 data', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '03',
          fileName: 'input',
        })
      )
    )
  ).toBe(525181)
})

test('part 2 example', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '03',
          fileName: 'example',
        })
      )
    )
  ).toBe(467835)
})

test('part 2 data', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '03',
          fileName: 'input',
        })
      )
    )
  ).toBe(84289137)
})
