const processStacks = (rawStacks) => {
  const rows = rawStacks.split('\n')
  const stackCount = rows[rows.length - 1].split(' ').filter(Boolean).length
  const stacks = Array.from(new Array(stackCount), () => new Array())
  const crateRegEx = new RegExp(/\[(.)\]/)

  // Loop through every row of crates
  for (let i = 0; i < rows.length - 1; i++) {
    // Loop through the characters in the row, 4 at a time
    for (let j = 0; j < rows[i].length; j += 4) {
      // Grab 3 characters from the row then extract the letter out of [A]
      const crate = rows[i].slice(j, j + 4).match(crateRegEx)?.[1]
      if (crate) {
        stacks[j / 4].push(crate)
      }
    }
  }

  return stacks
}

export const parseInput = (input) => {
  const [rawStacks, rawMoves] = input.split('\n\n')
  const stacks = processStacks(rawStacks)
  const moves = rawMoves
    .split('\n')
    .map((row) => [...row.matchAll(/\d+/g)].map((match) => parseInt(match[0])))

  return [stacks, moves]
}

export const part1 = ([stacks, moves]) => {
  for (let [containerCount, fromStackId, toStackId] of moves) {
    const crates = stacks[fromStackId - 1].splice(0, containerCount)
    for (const crate of crates) {
      stacks[toStackId - 1].unshift(crate)
    }
  }

  return stacks.map((stack) => stack[0]).join('')
}

export const part2 = ([stacks, moves]) => {
  for (let [containerCount, fromStackId, toStackId] of moves) {
    const crates = stacks[fromStackId - 1].splice(0, containerCount)
    stacks[toStackId - 1].unshift(...crates)
  }

  return stacks.map((stack) => stack[0]).join('')
}
