import { sum } from '../../../lib'

export const parseInput = (input) =>
  input.split('\n').map((row) => row.split('').map(Number))

const getTreesOnLeft = (input, row, column) => input[row].slice(0, column)

const getTreesOnRight = (input, row, column) => input[row].slice(column + 1)

const getTreesAbove = (input, row, column) => {
  const trees = []
  let currentTree = row - 1

  while (currentTree >= 0) {
    trees.push(input[currentTree][column])
    currentTree--
  }

  return trees
}

const getTreesBelow = (input, row, column) => {
  const trees = []
  let currentTree = row + 1

  while (currentTree <= input.length - 1) {
    trees.push(input[currentTree][column])
    currentTree++
  }

  return trees
}

export const part1 = (input) => {
  const rowCount = input.length
  const columnCount = input[0].length
  let totalVisible = rowCount * 2 + (columnCount - 2) * 2

  for (let row = 1; row < rowCount - 1; row++) {
    for (let column = 1; column < columnCount - 1; column++) {
      const tree = input[row][column]

      const treesOnLeft = getTreesOnLeft(input, row, column)
      const treesOnRight = getTreesOnRight(input, row, column)
      const treesAbove = getTreesAbove(input, row, column)
      const treesBelow = getTreesBelow(input, row, column)

      if (
        Math.max(...treesOnLeft) < tree ||
        Math.max(...treesOnRight) < tree ||
        Math.max(...treesAbove) < tree ||
        Math.max(...treesBelow) < tree
      ) {
        totalVisible++
      }
    }
  }

  return totalVisible
}

export const part2 = (input) => {
  const rowCount = input.length
  const columnCount = input[0].length
  const scores = []

  for (let row = 1; row < rowCount - 1; row++) {
    for (let column = 1; column < columnCount - 1; column++) {
      const tree = input[row][column]

      const treesOnLeft = getTreesOnLeft(input, row, column)
      const treesOnRight = getTreesOnRight(input, row, column)
      const treesAbove = getTreesAbove(input, row, column)
      const treesBelow = getTreesBelow(input, row, column)

      let score = 1
      for (const trees of [
        treesOnLeft.reverse(),
        treesOnRight,
        treesAbove,
        treesBelow,
      ]) {
        let visibleTrees = 0
        for (let i = 0; i < trees.length; i++) {
          const currTree = trees[i]
          if (currTree < tree) {
            visibleTrees++
          } else if (currTree >= tree) {
            visibleTrees++
            break
          } else {
            break
          }
        }

        score *= visibleTrees
      }

      scores.push(score)
    }
  }

  return Math.max(...scores)
}
