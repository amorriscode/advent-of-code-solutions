export const parseInput = (input) =>
  input
    .split('\n\n')
    .map((r) => {
      const calories = r.split('\n').map((c) => parseInt(c))
      return calories.reduce((acc, curr) => acc + curr)
    })
    .sort((a, b) => b - a)

export const part1 = (input) => {
  return input[0]
}

export const part2 = (input) => {
  return input.slice(0, 3).reduce((acc, curr) => acc + curr)
}

export default {
  part1,
  part2,
}
