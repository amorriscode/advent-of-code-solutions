import { example, data } from './input'

export const inputParser = (input) =>
  input.split('\n').map((line) => line.split(''))

const parsedData = inputParser(data)

const openBracketMap = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const closedBracketMap = {
  ')': {
    openChar: '(',
    invalidScore: 3,
  },
  ']': {
    openChar: '[',
    invalidScore: 57,
  },
  '}': {
    openChar: '{',
    invalidScore: 1197,
  },
  '>': {
    openChar: '<',
    invalidScore: 25137,
  },
}

const parseLine = (line) => {
  const chunk = []

  for (const char of line) {
    if (!closedBracketMap[char]) {
      chunk.push(char)
      continue
    }

    const lastChar = chunk.pop()

    if (lastChar !== closedBracketMap[char].openChar) {
      return [chunk, char]
    }
  }

  return [chunk, null]
}

export const part1 = (input = parsedData) => {
  const illegalCounts = {
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0,
  }

  for (const line of input) {
    const [_, illegalChar] = parseLine(line)

    if (illegalChar) {
      illegalCounts[illegalChar] += 1
    }
  }

  return Object.keys(illegalCounts).reduce(
    (acc, char) =>
      illegalCounts[char] * closedBracketMap[char].invalidScore + acc,
    0
  )
}

export const part2 = (input = parsedData) => {
  const scores = []

  for (const line of input) {
    const [incompleteBrackets, illegalChar] = parseLine(line)

    if (illegalChar) {
      continue
    }

    incompleteBrackets.reverse()

    scores.push(
      incompleteBrackets.reduce(
        (acc, char) => 5 * acc + openBracketMap[char],
        0
      )
    )
  }

  scores.sort((a, b) => a - b)

  return scores[Math.floor(scores.length / 2)]
}

export default {
  part1,
  part2,
}
