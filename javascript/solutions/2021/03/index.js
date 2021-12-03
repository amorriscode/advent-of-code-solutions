import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

const countBit = (nums, bit) => {
  const counts = [0, 0]

  for (const num of nums) {
    counts[num[bit]] += 1
  }

  return counts
}

const counter = (input, priorityBit, secondaryBit) => {
  let nums = [...input]

  for (let i = 0; i < input.length; i++) {
    const [zeroCount, oneCount] = countBit(nums, i)
    const keep = oneCount >= zeroCount ? priorityBit : secondaryBit
    const count = Math.max(zeroCount, oneCount)

    nums = nums
      .filter((num) => +num[i] !== keep)
      .slice(0, Math.max(zeroCount, oneCount))

    if (nums.length === 1) {
      break
    }
  }

  return parseInt(nums[0], 2)
}

export const part1 = (input = parsedData) => {
  const rates = ['', '']

  for (let i = 0; i < input[0].length; i++) {
    const [zeroCount, oneCount] = countBit(input, i)

    const gammaeRate = oneCount > zeroCount ? '1' : '0'
    rates[0] += gammaeRate

    const epsilonRate = oneCount < zeroCount ? '1' : '0'
    rates[1] += epsilonRate
  }

  return parseInt(rates[0], 2) * parseInt(rates[1], 2)
}

export const part2 = (input = parsedData) => {
  return counter(input, 1, 0) * counter(input, 0, 1)
}

export default {
  part1,
  part2,
}
