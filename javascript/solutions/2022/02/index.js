const MOVES = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const LOSING_LOOKUP = {
  [MOVES.rock]: MOVES.paper,
  [MOVES.paper]: MOVES.scissors,
  [MOVES.scissors]: MOVES.rock,
}

const WINNING_LOOKUP = {
  [MOVES.rock]: MOVES.scissors,
  [MOVES.paper]: MOVES.rock,
  [MOVES.scissors]: MOVES.paper,
}

const MOVE_LOOKUP = {
  A: MOVES.rock,
  B: MOVES.paper,
  C: MOVES.scissors,
  X: MOVES.rock,
  Y: MOVES.paper,
  Z: MOVES.scissors,
}

export const parseInput = (input) =>
  input.split('\n').map((round) => round.split(' '))

const getMoveScore = (move) => MOVE_LOOKUP[move]

const didPlayerWin = (opponentMove, playerMove) =>
  LOSING_LOOKUP[getMoveScore(opponentMove)] === getMoveScore(playerMove)

export const part1 = (input) => {
  let score = 0

  for (const [opponentMove, playerMove] of input) {
    score += getMoveScore(playerMove)

    if (didPlayerWin(opponentMove, playerMove)) {
      score += 6
    }

    if (getMoveScore(opponentMove) === getMoveScore(playerMove)) {
      score += 3
    }
  }

  return score
}

export const part2 = (input) => {
  let score = 0

  for (const [opponentMove, roundResult] of input) {
    if (roundResult === 'X') {
      score += WINNING_LOOKUP[getMoveScore(opponentMove)]
    }

    if (roundResult === 'Y') {
      score += 3 + getMoveScore(opponentMove)
    }

    if (roundResult === 'Z') {
      score += 6 + LOSING_LOOKUP[getMoveScore(opponentMove)]
    }
  }

  return score
}
