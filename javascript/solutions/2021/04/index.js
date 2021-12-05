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

    const rowNumbers = inputRows[i].split(' ').filter(Boolean)
    const boardRow = {}
    for (let j = 0; j < rowNumbers.length; j++) {
      boardRow[j] = { value: parseInt(rowNumbers[j]), called: false }
    }

    board.push(boardRow)
  }

  return [numbers, boards]
}

const parsedData = inputParser(example)

const markCalled = (board, numberCalled) => {
  board.forEach((row, rowIndex) => {
    Object.values(row).forEach(({ value }, columnIndex) => {
      if (value === numberCalled) {
        board[rowIndex][columnIndex].called = true
      }
    })
  })
}

const checkBoardWin = (board) => {
  const colSeenCount = {}

  const hasWinningRow = board.some((row) =>
    Object.values(row).every(({ called }) => called)
  )

  board.forEach((row) =>
    Object.values(row).forEach(({ called, value }, colIndex) => {
      if (called) {
        colSeenCount[colIndex] = (colSeenCount[colIndex] || 0) + 1
      }
    })
  )

  return (
    hasWinningRow ||
    Object.values(colSeenCount).some((count) => count === board.length)
  )
}

const calculateScore = (board) => {
  let score = 0

  board.forEach((row) => {
    Object.values(row).forEach(({ value, called }) => {
      if (!called) {
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
  const winningBoardScores = []
  const winningBoards = new Set()

  for (const number of numbers) {
    for (const [boardId, board] of boards.entries()) {
      markCalled(board, number)
      const hasWon = checkBoardWin(board)

      if (hasWon && !winningBoards.has(boardId)) {
        winningBoards.add(boardId)
        winningBoardScores.push(calculateScore(board) * number)
      }
    }
  }

  return winningBoardScores[winningBoardScores.length - 1]
}

export default {
  part1,
  part2,
}
