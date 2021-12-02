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

export const part1 = (input = parsedData) => {
  const pos = [0, 0]

  input.forEach(([dir, dist]) => {
    const mod = INSTRUCTIONS[dir][0]
    mod(pos, dist)
  })

  return pos[0] * pos[1]
}

export const part2 = (input = parsedData) => {
  const pos = [0, 0, 0]

  input.forEach(([dir, dist]) => {
    const mod = INSTRUCTIONS[dir][1]
    mod(pos, dist)
  })

  return pos[0] * pos[1]
}

export default {
  part1,
  part2,
}
