import input from './input'

const data = input.split('\n\n')

const parseDecks = (decks) => {
  return decks.map((deck) => deck.match(/\n(\d+)/g).map(Number))
}

export const part1 = (input = data) => {
  const [playerOneDeck, playerTwoDeck] = parseDecks(input)

  while (playerOneDeck.length && playerTwoDeck.length) {
    const playerOneCard = playerOneDeck.shift()
    const playerTwoCard = playerTwoDeck.shift()

    if (playerOneCard > playerTwoCard) {
      playerOneDeck.push(playerOneCard)
      playerOneDeck.push(playerTwoCard)
    } else {
      playerTwoDeck.push(playerTwoCard)
      playerTwoDeck.push(playerOneCard)
    }
  }

  const winningDeck =
    playerOneDeck.length > playerTwoDeck.length ? playerOneDeck : playerTwoDeck

  return winningDeck.reverse().reduce((acc, curr, index) => {
    const currIndex = index + 1
    return acc + curr * currIndex
  })
}

const recursiveCombat = (playerOneDeck, playerTwoDeck) => {
  const seen = new Set()

  while (playerOneDeck.length && playerTwoDeck.length) {
    const key = `${playerOneDeck.join(',')}|${playerTwoDeck.join(',')}`

    if (seen.has(key)) {
      return [1, playerOneDeck]
    }

    seen.add(key)

    const playerOneCard = playerOneDeck.shift()
    const playerTwoCard = playerTwoDeck.shift()

    let winningDeck

    if (
      playerOneDeck.length >= playerOneCard &&
      playerTwoDeck.length >= playerTwoCard
    ) {
      ;[winningDeck] = recursiveCombat(
        playerOneDeck.slice(0, playerOneCard),
        playerTwoDeck.slice(0, playerTwoCard)
      )
    } else {
      winningDeck = playerOneCard > playerTwoCard ? 1 : 2
    }

    if (winningDeck === 1) {
      playerOneDeck.push(playerOneCard)
      playerOneDeck.push(playerTwoCard)
    } else {
      playerTwoDeck.push(playerTwoCard)
      playerTwoDeck.push(playerOneCard)
    }
  }

  return playerOneDeck.length ? [1, playerOneDeck] : [2, playerTwoDeck]
}

export const part2 = (input = data) => {
  const [playerOneDeck, playerTwoDeck] = parseDecks(input)
  const [, winningDeck] = recursiveCombat(playerOneDeck, playerTwoDeck)

  return winningDeck.reverse().reduce((acc, curr, index) => {
    const currIndex = index + 1
    return acc + curr * currIndex
  })
}

export default {
  part1,
  part2,
}
