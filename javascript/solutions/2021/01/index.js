import { data } from './input'

export const inputParser = (input) => input.split('\n').map(Number)

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  let increasingDepths = 0

  for (let i = 1; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
      increasingDepths++
    }
  }

  return increasingDepths
}

export const part2 = (input = parsedData) => {
  let increasingDepths = 0
  let prevSum = input[0] + input[1] + input[2]
  let windowStart = 0

  for (let windowEnd = 3; windowEnd < input.length; windowEnd++) {
    const currSum = prevSum - input[windowStart] + input[windowEnd]

    if (prevSum < currSum) {
      increasingDepths++
    }

    prevSum = currSum
    windowStart++
  }

  return increasingDepths
}

export default {
  part1,
  part2,
}
