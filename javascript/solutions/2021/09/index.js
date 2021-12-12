import { example, data } from './input'

export const inputParser = (input) =>
  input.split('\n').map((row) => row.split('').map(Number))

const parsedData = inputParser(data)

const getAbove = (points, [row, col]) => (row > 0 ? points[row - 1][col] : null)

const getBelow = (points, [row, col]) =>
  row < points.length - 1 ? points[row + 1][col] : null

const getLeft = (points, [row, col]) => (col > 0 ? points[row][col - 1] : null)

const getRight = (points, [row, col]) =>
  col < points[row].length - 1 ? points[row][col + 1] : null

const isLowPoint = (points, [row, col]) => {
  const above = getAbove(points, [row, col])
  const below = getBelow(points, [row, col])
  const left = getLeft(points, [row, col])
  const right = getRight(points, [row, col])

  return [above, below, left, right].every(
    (point) => point === null || point > points[row][col]
  )
}

const findBasinSize = (points, [row, col], seen = {}, size = 0) => {
  if (points[row][col] === 9 || seen[`${row},${col}`]) return size

  seen[`${row},${col}`] = true

  const above = getAbove(points, [row, col])
  const below = getBelow(points, [row, col])
  const left = getLeft(points, [row, col])
  const right = getRight(points, [row, col])

  if (above && above > points[row][col]) {
    size += findBasinSize(points, [row - 1, col], seen)
  }

  if (below && below > points[row][col]) {
    size += findBasinSize(points, [row + 1, col], seen)
  }

  if (left && left > points[row][col]) {
    size += findBasinSize(points, [row, col - 1], seen)
  }

  if (right && right > points[row][col]) {
    size += findBasinSize(points, [row, col + 1], seen)
  }

  return size + 1
}

export const part1 = (input = parsedData) => {
  let riskLevel = 0

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (isLowPoint(input, [row, col])) {
        riskLevel += input[row][col] + 1
      }
    }
  }

  return riskLevel
}

export const part2 = (input = parsedData) => {
  const basins = []

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (isLowPoint(input, [row, col])) {
        basins.push(findBasinSize(input, [row, col]))
      }
    }
  }

  basins.sort((a, b) => b - a)

  return basins[0] * basins[1] * basins[2]
}

export default {
  part1,
  part2,
}
