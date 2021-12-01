import input from './input'

export const inputParser = (input) =>
  input.split('\n').map((line) => line.match(/(w|e|nw|ne|sw|se)/g))

const data = inputParser(input)

const move = {
  w: ({ x, y }) => ({ x: x - 1, y }),
  e: ({ x, y }) => ({ x: x + 1, y }),
  nw: ({ x, y }) => ({ x: x - 0.5, y: y - 1 }),
  ne: ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  sw: ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  se: ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
}

const mapInstructions = (instructions) => {
  const map = new Map()

  instructions.forEach((instruction) => {
    let position = { x: 0, y: 0 }

    instruction.forEach((direction) => {
      position = move[direction](position)
    })

    const key = `${position.x},${position.y}`
    map.set(key, !map.get(key))
  })

  return map
}

const getNeighbours = (key) => {
  const [x, y] = key.split(',').map(Number)
  return Object.values(move)
    .map((func) => func({ x, y }))
    .map(({ x, y }) => `${x},${y}`)
}

const isAlive = (current, active) => (current && active === 1) || active === 2

const generateLife = (map) => {
  let next = new Map()
  let missing = []
  let count = 0

  for (let key of map.keys()) {
    if (map.get(key)) {
      missing = [
        ...missing,
        ...getNeighbours(key).filter((key) => !map.has(key)),
      ]
    }
  }

  missing.forEach((key) => map.set(key, false))

  for (let key of map.keys()) {
    const active = getNeighbours(key).filter((key) => map.get(key)).length
    const current = map.get(key)

    next.set(key, isAlive(current, active))

    if (next.get(key)) {
      count++
    }
  }

  return { next, count }
}

const gameOfLife = (map) => {
  let result

  for (let i = 0; i < 100; i++) {
    result = generateLife(map)
    map = result.next
  }

  return result
}

export const part1 = (instructions = data) => {
  return [...mapInstructions(instructions).values()].filter(Boolean).length
}

export const part2 = (instructions = data) => {
  const map = mapInstructions(instructions)
  return gameOfLife(map, 100).count
}

export default {
  part1,
  part2,
}
