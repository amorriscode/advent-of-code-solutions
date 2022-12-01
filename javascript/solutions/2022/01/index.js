import { example, data } from './input'

export const inputParser = (input) =>
  input
    .split('\n\n')
    .map((r) => {
      const calories = r.split('\n').map((c) => parseInt(c))
      return calories.reduce((acc, curr) => acc + curr)
    })
    .sort((a, b) => b - a)

const parsedData = inputParser(example)

export const part1 = (input = parsedData) => {
  return input[0]
}

export const part2 = (input = parsedData) => {
  return input.slice(0, 3).reduce((acc, curr) => acc + curr)
}

export default {
  part1,
  part2,
}
