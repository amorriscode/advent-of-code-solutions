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

const filterNumbers = (input, priorityBit, secondaryBit) => {
  let nums = [...input]

  for (let i = 0; i < input.length; i++) {
    const [zeroCount, oneCount] = countBit(nums, i)

    const bit = oneCount >= zeroCount ? priorityBit : secondaryBit
    const count = Math.max(zeroCount, oneCount)

    nums = nums.filter((num) => +num[i] !== bit).slice(0, count)

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

    rates[0] += oneCount > zeroCount ? '1' : '0'
    rates[1] += oneCount > zeroCount ? '0' : '1'
  }

  return parseInt(rates[0], 2) * parseInt(rates[1], 2)
}

export const part2 = (input = parsedData) => {
  return filterNumbers(input, 1, 0) * filterNumbers(input, 0, 1)
}

export default {
  part1,
  part2,
}
