import { parseInput, part1, part2 } from './index.js'
import { getInput } from '../../../lib'

test('part 1 example', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '05',
          fileName: 'example',
        })
      )
    )
  ).toBe(35)
})

test('part 1 data', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '2023',
          day: '05',
          fileName: 'input',
        })
      )
    )
  ).toBe(510109797)
})

test('part 2 example', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '05',
          fileName: 'example',
        })
      )
    )
  ).toBe(46)
})

test('part 2 data', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '2023',
          day: '05',
          fileName: 'input',
        })
      )
    )
  ).toBe(9622622)
})
