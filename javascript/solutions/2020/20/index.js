import input from './input'

const topBorder = (tile) => tile[0]
const bottomBorder = (tile) => tile[tile.length - 1]
const leftBorder = (tile) => tile.map((row) => row[0]).join('')
const rightBorder = (tile) => tile.map((row) => row[row.length - 1]).join('')

const mirror = (tile) => tile.map((row) => row.split('').reverse().join(''))
const rotate = (tile) =>
  mirror(tile.map((_, i) => tile.map((row) => row[i]).join('')))

const findRotation = (tile, fn) => tile && tile.rotations.find(fn)

const allRotations = (tile) => {
  return [
    tile,
    rotate(tile),
    rotate(rotate(tile)),
    rotate(rotate(rotate(tile))),
  ].flatMap((tile) => [tile, mirror(tile)])
}

const parseTile = (rows) => {
  let [id, ...tile] = rows.split('\n')

  const rotations = allRotations(tile)

  return {
    id: parseInt(id.match(/^Tile (\d+):$/).pop()),
    tile,
    rotations,
    borders: rotations.map((tile) => topBorder(tile)),
  }
}

export const inputParser = (input) =>
  input.split('\n\n').map((tile) => parseTile(tile))

const data = inputParser(input)

const findCorners = (tiles) => {
  const corners = tiles.filter((tile) => {
    const matches = tiles
      .filter(({ id }) => tile.id !== id)
      .filter(({ borders }) =>
        borders.some((border) => tile.borders.includes(border))
      )

    return new Set(matches).size === 2
  })

  return corners.map((tile) => tile.id)
}

const spliceTile = (tiles, fn) => {
  const found = tiles.find(fn)

  if (found) {
    tiles.splice(tiles.indexOf(found), 1)
    return found
  }
}

const solve = (tiles, firstCorner) => {
  let next = findRotation(
    spliceTile(tiles, (tile) => tile.id === firstCorner),
    (tile) => {
      const matches = tiles.filter(({ borders }) =>
        borders.some(
          (border) => border === topBorder(tile) || border === leftBorder(tile)
        )
      )
      return matches.length === 0
    }
  )

  const map = [[]]

  while (next) {
    const right = rightBorder(next)
    map[map.length - 1].push(next)

    next = findRotation(
      spliceTile(tiles, (tile) => tile.borders.includes(right)),
      (tile) => leftBorder(tile) === right
    )

    if (!next) {
      const bottom = bottomBorder(map[map.length - 1][0])
      map.push([])

      next = findRotation(
        spliceTile(tiles, (tile) => tile.borders.includes(bottom)),
        (tile) => topBorder(tile) === bottom
      )
    }
  }

  map.pop()

  return map
}

const countMonsters = (image) => {
  const monster = [
    '                  # ',
    '#    ##    ##    ###',
    ' #  #  #  #  #  #   ',
  ]

  const pattern = monster.map((x) => new RegExp(`^${x.replace(/ /g, '.')}`))
  const size = monster.join('').match(/#/g).length

  let count = 0
  for (let i = 0; i < image.length - (pattern.length - 1); i++) {
    for (let j = 0; j < image.length; j++) {
      if (pattern.every((line, k) => image[i + k].slice(j).match(line))) {
        count++
      }
    }
  }

  return count * size
}

export const part1 = (tiles = data) => {
  return findCorners(tiles).reduce((a, b) => a * b)
}

export const part2 = (tiles = data) => {
  const corners = findCorners(tiles)
  const map = solve(tiles, corners[0])

  const withoutBorders = map.map((row) =>
    row.map((tile) => tile.slice(1, -1).map((line) => line.slice(1, -1)))
  )

  const image = withoutBorders.flatMap((row) =>
    row.reduce((combined, tile) => combined.map((line, i) => line + tile[i]))
  )

  const monsterCount = allRotations(image)
    .map((tile) => countMonsters(tile))
    .find((x) => x !== 0)

  return image.join('').match(/#/g).length - monsterCount
}

export default {
  part1,
  part2,
}
