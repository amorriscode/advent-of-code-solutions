import { example, data } from './input'

export const inputParser = (input) =>
  input
    .split('\n')
    .map((line) => line.split(' '))
    .map(([dir, val]) => [dir, parseInt(val)])

const parsedData = inputParser(data)

const addDistToPos = (pos, dist, index) => (pos[index] += dist)
const subDistFromPos = (pos, dist, index) => (pos[index] -= dist)

const INSTRUCTIONS = {
  forward: {
    0: (pos, dist) => addDistToPos(pos, dist, 0),
    1: (pos, dist) => {
      addDistToPos(pos, dist, 0)
      pos[1] += dist * pos[2]
    },
  },
  up: {
    0: (pos, dist) => subDistFromPos(pos, dist, 1),
    1: (pos, dist) => subDistFromPos(pos, dist, 2),
  },
  down: {
    0: (pos, dist) => addDistToPos(pos, dist, 1),
    1: (pos, dist) => addDistToPos(pos, dist, 2),
  },
}

const solve = (mode, input) => {
  const pos = [0, 0, 0]

  input.forEach(([dir, dist]) => {
    const mod = INSTRUCTIONS[dir][mode]
    mod(pos, dist)
  })

  return pos[0] * pos[1]
}

export const part1 = (input = parsedData) => {
  return solve(0, input)
}

export const part2 = (input = parsedData) => {
  return solve(1, input)
}

export default {
  part1,
  part2,
}
