import { example, data } from './input'

export const inputParser = (input) =>
  input.split('\n').map((line) => {
    const [start, end] = line.split(' -> ')
    const [x1, y1] = start.split(',').map(Number)
    const [x2, y2] = end.split(',').map(Number)
    return { x1, y1, x2, y2 }
  })

const parsedData = inputParser(data)

const getIncrementValue = (start, end) => {
  if (start < end) {
    return 1
  }

  if (start > end) {
    return -1
  }

  return 0
}

const findIntersections = (data, withDiagonals = false) => {
  const grid = Array.from(Array(1000), () => Array(1000).fill(0))

  for (const { x1, y1, x2, y2 } of data) {
    if (!withDiagonals && x1 !== x2 && y1 !== y2) {
      continue
    }

    const horizontalIncrement = getIncrementValue(x1, x2)
    const verticalIncrement = getIncrementValue(y1, y2)

    let currX = x1
    let currY = y1

    while (currX !== x2 || currY !== y2) {
      grid[currX][currY] += 1

      currX += horizontalIncrement
      currY += verticalIncrement
    }

    grid[currX][currY] += 1
  }

  let intersectionCount = 0

  for (const row of grid) {
    for (const cell of row) {
      if (cell > 1) {
        intersectionCount += 1
      }
    }
  }

  return intersectionCount
}

export const part1 = (input = parsedData) => {
  return findIntersections(input)
}

export const part2 = (input = parsedData) => {
  return findIntersections(input, true)
}

export default {
  part1,
  part2,
}
