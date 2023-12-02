export const parseInput = (input) =>
  input.split('\n').map((game) => {
    const [gameIdPart, setsPart] = game.split(': ')
    const id = +gameIdPart.match(/\d+/)[0]

    const sets = setsPart.split(';').map((set) => {
      const totalCubes = {}
      set.split(', ').map((cube) => {
        const type = cube.match(/[a-z]+/)[0]
        const count = +cube.match(/\d+/)[0]
        totalCubes[type] = count
      })
      return totalCubes
    })

    return { id, sets }
  })

export const part1 = (input) => {
  const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  }

  return input
    .filter((game) =>
      game.sets.every((set) => {
        for (const [type, count] of Object.entries(set)) {
          if (maxCubes[type] < count) {
            return false
          }
        }

        return true
      })
    )
    .reduce((total, { id }) => total + id, 0)
}

export const part2 = (input) => {
  return input
    .map((game) => {
      const maxCubes = {
        red: -Infinity,
        green: -Infinity,
        blue: -Infinity,
      }

      for (const set of game.sets) {
        for (const [type, count] of Object.entries(set)) {
          maxCubes[type] = Math.max(maxCubes[type], count)
        }
      }

      return maxCubes.red * maxCubes.green * maxCubes.blue
    })
    .reduce((total, curr) => total + curr, 0)
}
