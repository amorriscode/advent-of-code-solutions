import input from './input'

export const inputParser = (input) => input.split('\n').map(Number)

const data = inputParser(input)

const calculateKey = (subject, loop) => {
  let value = 1

  for (let i = 0; i < loop; i++) {
    value *= subject
    value %= 20201227
  }

  return value
}

export const part1 = (keys = data) => {
  let value = 1

  for (let i = 1; i < Infinity; i++) {
    value *= 7
    value %= 20201227

    if (value === keys[0]) {
      return calculateKey(keys[1], i)
    }

    if (value === keys[1]) {
      return calculateKey(keys[0], i)
    }
  }
}

export const part2 = () => {
  return undefined
}

export default {
  part1,
  part2,
}
