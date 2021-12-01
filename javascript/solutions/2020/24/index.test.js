const { inputParser, part1, part2 } = require('./index.js')
const dedent = require('dedent')

test('part1 passes examples', () => {
  expect(
    part1(
      inputParser(
        dedent`sesenwnenenewseeswwswswwnenewsewsw
          neeenesenwnwwswnenewnwwsewnenwseswesw
          seswneswswsenwwnwse
          nwnwneseeswswnenewneswwnewseswneseene
          swweswneswnenwsewnwneneseenw
          eesenwseswswnenwswnwnwsewwnwsene
          sewnenenenesenwsewnenwwwse
          wenwwweseeeweswwwnwwe
          wsweesenenewnwwnwsenewsenwwsesesenwne
          neeswseenwwswnwswswnw
          nenwswwsewswnenenewsenwsenwnesesenew
          enewnwewneswsewnwswenweswnenwsenwsw
          sweneswneswneneenwnewenewwneswswnese
          swwesenesewenwneswnwwneseswwne
          enesenwswwswneneswsenwnewswseenwsese
          wnwnesenesenenwwnenwsewesewsesesew
          nenewswnwewswnenesenwnesewesw
          eneswnwswnwsenenwnwnwwseeswneewsenese
          neswnwewnwnwseenwseesewsenwsweewe
          wseweeenwnesenwwwswnew`
      )
    )
  ).toBe(10)
})

test('part2 passes examples', () => {
  expect(
    part2(
      inputParser(
        dedent`sesenwnenenewseeswwswswwnenewsewsw
          neeenesenwnwwswnenewnwwsewnenwseswesw
          seswneswswsenwwnwse
          nwnwneseeswswnenewneswwnewseswneseene
          swweswneswnenwsewnwneneseenw
          eesenwseswswnenwswnwnwsewwnwsene
          sewnenenenesenwsewnenwwwse
          wenwwweseeeweswwwnwwe
          wsweesenenewnwwnwsenewsenwwsesesenwne
          neeswseenwwswnwswswnw
          nenwswwsewswnenenewsenwsenwnesesenew
          enewnwewneswsewnwswenweswnenwsenwsw
          sweneswneswneneenwnewenewwneswswnese
          swwesenesewenwneswnwwneseswwne
          enesenwswwswneneswsenwnewswseenwsese
          wnwnesenesenenwwnenwsewesewsesesew
          nenewswnwewswnenesenwnesewesw
          eneswnwswnwsenenwnwnwwseeswneewsenese
          neswnwewnwnwseenwseesewsenwsweewe
          wseweeenwnesenwwwswnew`
      )
    )
  ).toBe(2208)
})
