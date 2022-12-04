import { setIntersection, sum } from '../../../lib'

export const parseInput = (input) => input.split('\n')

const getSharedItems = (compartmentA, compartmentB) => [
  ...setIntersection(new Set(compartmentA), new Set(compartmentB)),
]

const getPriority = (char) =>
  [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ].indexOf(char) + 1

export const part1 = (input) => {
  return input
    .map((rucksack) => {
      const mid = rucksack.length / 2
      return [rucksack.slice(0, mid), rucksack.slice(mid)]
    })
    .map(([compartmentA, compartmentB]) =>
      getSharedItems(compartmentA, compartmentB).map((item) =>
        getPriority(item)
      )
    )
    .reduce((acc, curr) => acc + sum(curr), 0)
}

export const part2 = (input) => {
  const groups = []
  for (let i = 0; i < input.length; i += 3) {
    groups.push(input.slice(i, i + 3))
  }

  return groups
    .map(([elfA, elfB, elfC]) => {
      const sharedItemsAB = getSharedItems(elfA, elfB)
      const sharedItemsBC = getSharedItems(elfB, elfC)
      const sharedItemsCA = getSharedItems(elfC, elfA)
      return [...sharedItemsAB]
        .filter(
          (item) =>
            new Set(sharedItemsBC).has(item) && new Set(sharedItemsCA).has(item)
        )
        .map((item) => getPriority(item))
    })
    .reduce((acc, curr) => acc + sum(curr), 0)
}
