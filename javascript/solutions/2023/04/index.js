import { setIntersection, sum } from '../../../lib'

export const parseInput = (input) =>
  input.split('\n').map((row) => {
    const [_, winningNums, nums] = row.match(/: (.+?) \| (.+)/)
    return [winningNums.match(/\d+/g), nums.match(/\d+/g)]
  })

export const part1 = (input) => {
  return input.reduce((points, [winningNums, nums]) => {
    const matches = setIntersection(new Set(winningNums), new Set(nums))
    return matches.size > 0
      ? points + 1 * Math.pow(2, matches.size - 1)
      : points
  }, 0)
}

export const part2 = (input) => {
  const cards = Array(input.length).fill(1)

  for (const [i, [winningNums, nums]] of Object.entries(input)) {
    const matches = setIntersection(new Set(winningNums), new Set(nums))

    for (let j = 1; j <= matches.size; j++) {
      const rowIndex = +i + j
      cards[rowIndex] += cards[i]
    }
  }

  return sum(cards)
}
