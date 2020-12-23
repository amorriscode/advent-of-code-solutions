const { inputParser, part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(
    part1(
      inputParser(
        dedent`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
          trh fvjkl sbzzf mxmxvkd (contains dairy)
          sqjhc fvjkl (contains soy)
          sqjhc mxmxvkd sbzzf (contains fish)`
      )
    )
  ).toBe(5)
})

test('part2 passes examples', () => {
  expect(
    part2(
      inputParser(
        dedent`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
          trh fvjkl sbzzf mxmxvkd (contains dairy)
          sqjhc fvjkl (contains soy)
          sqjhc mxmxvkd sbzzf (contains fish)`
      )
    )
  ).toBe('mxmxvkd,sqjhc,fvjkl')
})
