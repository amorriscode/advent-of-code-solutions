export const parseInput = (input) =>
  input.split('\n').map((coord) => {
    const [dir, count] = coord.split(' ')
    return [dir, parseInt(count)]
  })

const COORDS = {
  L: { index: 0, magnitude: -1 },
  R: { index: 0, magnitude: 1 },
  U: { index: 1, magnitude: 1 },
  D: { index: 1, magnitude: -1 },
}

const isTouching = (posA, posB) => {
  return Math.abs(posA[0] - posB[0]) <= 1 && Math.abs(posA[1] - posB[1]) <= 1
}

const elementWiseSign = (numA, numB) => {
  const diff = numA - numB
  if (diff < 0) return -1
  if (diff === 0) return 0
  if (diff > 0) return 1
}

const solve = (knotCount, moves) => {
  const positions = Array.from(new Array(knotCount), () => [0, 0])
  const head = positions[0]
  const tailPositions = new Set([`0,0`])

  for (const [dir, count] of moves) {
    const { index, magnitude } = COORDS[dir]

    for (let i = 0; i < count; i++) {
      head[index] += magnitude

      for (let j = 1; j < positions.length; j++) {
        const prevPos = positions[j - 1]
        const currPos = positions[j]

        if (!isTouching(prevPos, currPos)) {
          currPos[0] += elementWiseSign(prevPos[0], currPos[0])
          currPos[1] += elementWiseSign(prevPos[1], currPos[1])
        }

        tailPositions.add(positions[positions.length - 1].join(','))
      }
    }
  }

  return tailPositions.size
}

export const part1 = (input) => {
  return solve(2, input)
}

export const part2 = (input) => {
  return solve(10, input)
}
