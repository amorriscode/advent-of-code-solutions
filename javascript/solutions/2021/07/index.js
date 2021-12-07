import { example, data } from './input'

export const inputParser = (input) =>
  input
    .split(',')
    .map(Number)
    .sort((a, b) => a - b)

const parsedData = inputParser(data)

const fuelSpent = (dist) => {
  let currFuelCost = 0

  for (let i = 0; i <= dist; i++) {
    currFuelCost += i
  }

  return currFuelCost
}

const calculateCost = (input, mid = null, fastFuel) => {
  const middle = mid || input[Math.floor(input.length / 2)]
  return input.reduce((acc, curr) => {
    const dist = Math.abs(curr - middle)
    const fuelCost = fastFuel ? fuelSpent(dist) : dist
    return acc + fuelCost
  }, 0)
}

export const part1 = (input = parsedData) => {
  return calculateCost(input)
}

export const part2 = (input = parsedData) => {
  let cheapestCost = calculateCost(input, null, true)

  for (let i = Math.min(...input); i < Math.max(...input); i++) {
    cheapestCost = Math.min(cheapestCost, calculateCost(input, i, true))
  }

  return cheapestCost
}

export default {
  part1,
  part2,
}
