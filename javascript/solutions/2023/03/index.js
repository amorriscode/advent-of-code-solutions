import { sum } from '../../../lib'

export const parseInput = (input) =>
  input.split('\n').map((row) => row.split(''))

const ALL_SYMBOLS = new Set([
  '*',
  '#',
  '+',
  '$',
  '!',
  '@',
  '%',
  '^',
  '&',
  '(',
  ')',
  '-',
  '_',
  '=',
  '{',
  '}',
  '[',
  ']',
  '\\',
  '|',
  ';',
  ':',
  '"',
  "'",
  ',',
  '/',
  '?',
  '<',
  '>',
])

function isNumeric(num) {
  return !isNaN(num)
}

function getAdjacentSymbols(input, rowIndex, colStart, colEnd, symbols) {
  const adjacentSymbols = []

  function getRowSymbols(rowIndex) {
    for (let i = Math.max(0, colStart - 1); i < colEnd + 1; i++) {
      if (symbols.has(input[rowIndex][i])) {
        adjacentSymbols.push({ x: rowIndex, y: i })
      }
    }

    return false
  }

  if (rowIndex - 1 >= 0) {
    getRowSymbols(rowIndex - 1)
  }

  if (rowIndex + 1 < input.length) {
    getRowSymbols(rowIndex + 1)
  }

  if (symbols.has(input[rowIndex][colEnd])) {
    adjacentSymbols.push({ x: rowIndex, y: colEnd })
  }

  if (symbols.has(input[rowIndex][colStart - 1])) {
    adjacentSymbols.push({ x: rowIndex, y: colStart - 1 })
  }

  return adjacentSymbols
}

function solve(input, symbols, fn) {
  for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
    const row = input[rowIndex]

    let colStart = 0
    while (colStart < row.length) {
      if (isNumeric(row[colStart])) {
        let colEnd = colStart

        while (isNumeric(row[colEnd])) {
          colEnd += 1
        }

        const num = row.slice(colStart, colEnd)
        const adjacentSymbols = getAdjacentSymbols(
          input,
          rowIndex,
          colStart,
          colEnd,
          symbols
        )
        fn(num, adjacentSymbols)

        colStart += num.length
      } else {
        colStart += 1
      }
    }
  }
}

export const part1 = (input) => {
  const validNums = []

  solve(input, ALL_SYMBOLS, (num, adjacentSymbols) => {
    if (adjacentSymbols.length > 0) {
      validNums.push(+num.join(''))
    }
  })

  return sum(validNums)
}

export const part2 = (input) => {
  const adjacencyCount = {}

  solve(input, new Set(['*']), (num, adjacentSymbols) => {
    for (const { x, y } of adjacentSymbols) {
      const key = `(${x},${y})`
      adjacencyCount[key] = {
        count: (adjacencyCount[key]?.count || 0) + 1,
        ratio: (adjacencyCount[key]?.ratio || 1) * +num.join(''),
      }
    }
  })

  return sum(
    Object.values(adjacencyCount)
      .filter(({ count }) => count === 2)
      .map(({ ratio }) => ratio)
  )
}
