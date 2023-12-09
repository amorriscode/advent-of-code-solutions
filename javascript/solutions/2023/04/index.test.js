import { parseInput, part1, part2 } from './index.js'
import { getInput } from '../../../lib'

test('part 1 example', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '04',
          fileName: 'example',
        })
      )
    )
  ).toBe(13)
})

test('part 1 data', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '04',
          fileName: 'input',
        })
      )
    )
  ).toBe(19855)
})

test('part 2 example', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '04',
          fileName: 'example',
        })
      )
    )
  ).toBe(30)
})

test('part 2 data', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '04',
          fileName: 'input',
        })
      )
    )
  ).toBe(10378710)
})
