export const parseInput = (input) => input.split('\n')

const wordToDigit = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const solve = (input, regex) => {
  return input.reduce((total, curr) => {
    const digits = [...curr.matchAll(regex)].map(
      (m) => wordToDigit[m[1]] ?? m[1]
    )

    return total + Number(digits[0] + digits[digits.length - 1])
  }, 0)
}

export const part1 = (input) => solve(input, /(\d)/g)

export const part2 = (input) =>
  solve(input, /(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
