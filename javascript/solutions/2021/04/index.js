import { example, data } from './input'

export const inputParser = (input) => {
  const inputRows = input.split('\n')
  const numbers = inputRows[0].split(',').map(Number)

  const boards = []
  let board = []

  for (let i = 2; i < inputRows.length + 1; i++) {
    if (inputRows[i] === '' || i === inputRows.length) {
      boards.push(board)
      board = []
      continue
    }

    board.push(inputRows[i].split(' ').filter(Boolean).map(Number))
  }

  return [numbers, boards]
}

const parsedData = inputParser(example)

const markCalled = (board, numberCalled) => {
  board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === numberCalled) {
        board[rowIndex][colIndex] *= -1

        // Stupid -0 hack?
        if (board[rowIndex][colIndex] === 0) {
          board[rowIndex][colIndex] = -0
        }
      }
    })
  })
}

const checkBoardWin = (board) => {
  const colSeenCount = {}

  const hasWinningRow = board.some((row) => row.every((value) => value < 0))

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] < 0 || board[row][col] === -0) {
        colSeenCount[col] = (colSeenCount[col] || 0) + 1
      }
    }
  }

  return (
    hasWinningRow ||
    Object.values(colSeenCount).some((count) => count === board.length)
  )
}

const calculateScore = (board) => {
  let score = 0

  board.forEach((row) => {
    row.forEach((value) => {
      if (value > 0) {
        score += value
      }
    })
  })

  return score
}

export const part1 = (input = parsedData) => {
  const [numbers, boards] = input

  for (const number of numbers) {
    for (const board of boards) {
      markCalled(board, number)
      const hasWon = checkBoardWin(board)

      if (hasWon) {
        return calculateScore(board) * number
      }
    }
  }

  return 'No winning board found'
}

export const part2 = (input = parsedData) => {
  const [numbers, boards] = input
  const winningBoards = new Set()
  let mostRecentWinningScore = 0

  for (const number of numbers) {
    for (const [boardId, board] of boards.entries()) {
      markCalled(board, number)
      const hasWon = checkBoardWin(board)

      if (hasWon && !winningBoards.has(boardId)) {
        winningBoards.add(boardId)
        mostRecentWinningScore = calculateScore(board) * number
      }
    }
  }

  return mostRecentWinningScore
}

export default {
  part1,
  part2,
}
