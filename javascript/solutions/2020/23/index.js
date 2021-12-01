import input from './input'

const data = input.split('').map(Number)

const linkedList = (cups) => {
  let list = {}
  let current = list
  const map = new Map()

  cups.forEach((cup) => {
    current.next = { value: cup }
    current = current.next
    map.set(cup, current)
  })

  list = list.next
  current.next = list

  return { list, map }
}

const play = (cups, moves) => {
  const nextDestination = (cup) => ((cup - 2 + cups.length) % cups.length) + 1

  let { list, map } = linkedList(cups)

  let current = list

  for (let i = 0; i < moves; i++) {
    let take = current.next
    current.next = take.next.next.next

    let destinationValue = nextDestination(current.value)
    const takenValues = [take.value, take.next.value, take.next.next.value]

    while (takenValues.includes(destinationValue)) {
      destinationValue = nextDestination(destinationValue)
    }

    let destination = map.get(destinationValue)
    take.next.next.next = destination.next
    destination.next = take
    current = current.next
  }

  return map.get(1)
}

const unwrap = (linkedList) => {
  let result = ''
  let current = linkedList

  do {
    result += current.value
    current = current.next
  } while (current !== linkedList)

  return result.slice(1)
}

export const part1 = (cups = data) => {
  return unwrap(play(cups, 100))
}

export const part2 = (cups = data) => {
  const array = new Array(1000000)
    .fill(0)
    .map((x, i) => i + 1)
    .slice(cups.length)

  const linkedList = play([...cups, ...array], 10000000)

  return `${linkedList.next.value * linkedList.next.next.value}`
}

export default {
  part1,
  part2,
}
