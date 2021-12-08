import { example, data } from './input'
import { sum } from '../../../lib'

export const inputParser = (input) => input.split(',')

const parsedData = inputParser(data)

const getFishCounter = (allFish) => {
  const fishCounter = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }

  allFish.forEach((fish) => (fishCounter[fish] += 1))

  return fishCounter
}

const moveTime = (fishCounter, days) => {
  for (let i = 0; i < days; i++) {
    for (const [lifeLeft, fishCount] of Object.entries(fishCounter)) {
      fishCounter[lifeLeft] -= fishCount

      if (lifeLeft - 1 < 0) {
        fishCounter[6] += fishCount
        fishCounter[8] += fishCount
      } else {
        fishCounter[lifeLeft - 1] += fishCount
      }
    }
  }

  return sum(Object.values(fishCounter))
}

export const part1 = (input = parsedData) => {
  const fishCounter = getFishCounter(input)
  return moveTime(fishCounter, 80)
}

export const part2 = (input = parsedData) => {
  const fishCounter = getFishCounter(input)
  return moveTime(fishCounter, 256)
}

export default {
  part1,
  part2,
}
