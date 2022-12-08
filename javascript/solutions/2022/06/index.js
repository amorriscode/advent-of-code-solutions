export const parseInput = (input) => input

const findContinuousSubstring = (string, length) => {
  let p1 = 0
  let p2 = 1

  while (p2 < string.length) {
    const currChar = string[p2]
    const window = string.slice(p1, p2)

    if (window.length === length) {
      break
    }

    if (window.includes(currChar)) {
      p1++
      continue
    }

    p2++
  }

  return p2
}

export const part1 = (input) => {
  return findContinuousSubstring(input, 4)
}

export const part2 = (input) => {
  return findContinuousSubstring(input, 14)
}
