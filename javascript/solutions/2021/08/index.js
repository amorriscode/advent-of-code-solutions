import { example, data } from './input'

export const inputParser = (input) =>
  input
    .split('\n')
    .map((line) => line.split(' | ').map((wires) => wires.split(' ')))

const parsedData = inputParser(data)

const getShortAndLongSet = (set1, set2) =>
  set1.size > set2.size ? [set1, set2] : [set2, set1]

const setIntersection = (set1, set2) => {
  const [longSet, shortSet] = getShortAndLongSet(set1, set2)
  return new Set([...longSet].filter((x) => shortSet.has(x)))
}

export const part1 = (input = parsedData) => {
  let counter = 0

  for (const line of input) {
    const [_, output] = line
    for (const o of output) {
      if ([2, 3, 4, 7].includes(o.length)) {
        counter++
      }
    }
  }

  return counter
}

export const part2 = (input = parsedData) => {
  let count = 0

  for (const line of input) {
    const [signals, output] = line

    const data = {}

    for (const s of signals) {
      const signalLength = s.length
      if ([2, 4].includes(signalLength)) {
        data[signalLength] = new Set(s)
      }
    }

    let n = ''

    for (const o of output) {
      const outputLength = o.length
      let set
      let intersection2
      let intersection4

      switch (outputLength) {
        case 2:
          n += '1'
          break
        case 3:
          n += '7'
          break
        case 4:
          n += '4'
          break
        case 5:
          set = new Set(o)

          intersection2 = setIntersection(data[2], set)
          intersection4 = setIntersection(data[4], set)

          if (intersection2.size === 2) {
            n += '3'
          } else if (intersection4.size === 2) {
            n += '2'
          } else {
            n += '5'
          }

          break
        case 7:
          n += '8'
          break
        case 6:
          set = new Set(o)
          intersection2 = setIntersection(data[2], set)
          intersection4 = setIntersection(data[4], set)

          if (intersection2.size === 1) {
            n += '6'
          } else if (intersection4.size === 4) {
            n += '9'
          } else {
            n += '0'
          }

          break
      }
    }

    count += parseInt(n)
  }

  return count
}

export default {
  part1,
  part2,
}
