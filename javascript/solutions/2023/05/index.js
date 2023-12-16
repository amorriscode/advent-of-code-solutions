function parseNumbers(numbers) {
  return numbers.match(/\d+/g).map(Number)
}

export const parseInput = (input) => {
  const [seeds, ...rest] = input
    .trim()
    .split('\n\n')
    .map((data, i) => {
      const [_, values] = data.split(':').map((d) => d.trim())

      if (i === 0) {
        return parseNumbers(values)
      }

      return values.split('\n').flatMap(parseNumbers)
    })

  return { seeds, destinations: rest.map((x) => groupNumbers(x, 3)) }
}

function groupNumbers(numbers, grouping) {
  return Array.from({ length: numbers.length / grouping }, (_, i) =>
    numbers.slice(i * grouping, i * grouping + grouping)
  )
}

function getLocation(seed, ranges) {
  for (const range of ranges) {
    for (const [destination, source, length] of range) {
      if (seed >= source && seed <= source + length) {
        seed = seed + destination - source
        break
      }
    }
  }

  return seed
}

export const part1 = ({ seeds, destinations }) => {
  return Math.min(...seeds.map((seed) => getLocation(seed, destinations)))
}

export const part2 = ({ seeds, destinations }) => {
  const seedGroups = groupNumbers(seeds, 2)
  const results = []

  function expand(index, values) {
    if (index === destinations.length) {
      return [values]
    }

    const result = []
    for (const [destination, source, range] of destinations[index]) {
      if (
        values[0] < source &&
        values[0] + values[1] > source &&
        values[0] + values[1] <= source + range
      ) {
        const firstTuple = [values[0], source - values[0]]
        const lastTuple = [destination, values[1] - source + values[0]]
        result.push(
          ...expand(index + 1, lastTuple),
          ...expand(index, firstTuple)
        )
        break
      } else if (
        values[0] >= source &&
        values[0] < source + range &&
        values[0] + values[1] > source + range
      ) {
        const firstTuple = [
          destination + values[0] - source,
          source + range - values[0],
        ]
        const lastTuple = [
          source + range,
          values[0] + values[1] - source - range,
        ]
        result.push(
          ...expand(index + 1, firstTuple),
          ...expand(index, lastTuple)
        )
        break
      } else if (
        values[0] >= source &&
        values[0] + values[1] <= source + range
      ) {
        result.push(
          ...expand(index + 1, [destination + values[0] - source, values[1]])
        )
        break
      } else if (values[0] < source && values[0] + values[1] > source + range) {
        const firstTuple = [values[0], source - values[0]]
        const middleTuple = [destination, range]
        const lastTuple = [
          source + range,
          values[0] + values[1] - source - range,
        ]
        result.push(
          ...expand(index, lastTuple),
          ...expand(index + 1, middleTuple),
          ...expand(index, firstTuple)
        )
        break
      }
    }

    if (result.length == 0) {
      result.push(...expand(index + 1, values))
    }

    return result
  }

  for (const seeds of seedGroups) {
    results.push(expand(0, seeds))
  }

  return Math.min(...results.flat().map((x) => x[0]))
}
