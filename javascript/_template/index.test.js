import { parseInput, part1, part2 } from './index.js'
import { getInput } from '../../../lib'

test('part 1 example', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '{{YEAR}}',
          day: '{{DAY}}',
          fileName: 'example',
        })
      )
    )
  ).toBe(0)
})

test('part 1 data', async () => {
  expect(
    part1(
      parseInput(
        await getInput({
          year: '{{YEAR}}',
          day: '{{DAY}}',
          fileName: 'input',
        })
      )
    )
  ).toBe(0)
})

test('part 2 example', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '{{YEAR}}',
          day: '{{DAY}}',
          fileName: 'example',
        })
      )
    )
  ).toBe(0)
})

test('part 2 data', async () => {
  expect(
    part2(
      parseInput(
        await getInput({
          year: '{{YEAR}}',
          day: '{{DAY}}',
          fileName: 'input',
        })
      )
    )
  ).toBe(0)
})
