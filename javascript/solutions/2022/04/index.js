import { setIntersection, sum } from '../../../lib'

export const parseInput = (input) =>
  input
    .split('\n')
    .map((row) =>
      row.split(',').map((section) => section.split('-').map(Number))
    )

const hasFullyContainedPair = (rangeA, rangeB) =>
  (rangeA[0] >= rangeB[0] &&
    rangeA[rangeA.length - 1] <= rangeB[rangeB.length - 1]) ||
  (rangeB[0] >= rangeA[0] &&
    rangeB[rangeB.length - 1] <= rangeA[rangeA.length - 1])

const getRangeSet = (range) => {
  const set = new Set()
  for (let i = range[0]; i <= range[1]; i++) {
    set.add(i)
  }
  return set
}

export const part1 = (input) => {
  return sum(
    input.map(([rangeA, rangeB]) =>
      hasFullyContainedPair(rangeA, rangeB) ? 1 : 0
    )
  )
}

export const part2 = (input) => {
  return sum(
    input.map(([rangeA, rangeB]) =>
      setIntersection(getRangeSet(rangeA), getRangeSet(rangeB)).size ? 1 : 0
    )
  )
}
