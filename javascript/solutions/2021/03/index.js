import { example, data } from './input'
import { rotateMatrix } from '../../../lib'

export const inputParser = (input) =>
  input.split('\n').map((num) => num.split(''))

const parsedData = inputParser(data)

const findCommonBit = (num, commonType = 'most', equalVal) => {
  let oneCount = 0
  let zeroCount = 0

  num.forEach((bit) => {
    if (bit === '1') {
      oneCount++
    } else if (bit === '0') {
      zeroCount++
    }
  })

  if (oneCount === zeroCount) {
    return { bit: equalVal, count: oneCount }
  }

  if (commonType === 'most') {
    return oneCount > zeroCount
      ? { bit: '1', count: oneCount }
      : { bit: '0', count: zeroCount }
  }

  if (commonType === 'least') {
    return oneCount < zeroCount
      ? { bit: '1', count: oneCount }
      : { bit: '0', count: zeroCount }
  }

  console.error('Invalid type provided')
}

const getSingleNumber = (numbersMatrix, commonType, equalVal) => {
  let rotatedNumberMatrix = numbersMatrix[0].map((_, colIndex) =>
    numbersMatrix.map((row) => row[colIndex])
  )

  let remainingNumbers = [...numbersMatrix]
  let row = 0

  while (row < rotatedNumberMatrix.length) {
    const { bit, count } = findCommonBit(
      rotatedNumberMatrix[row],
      commonType,
      equalVal
    )

    remainingNumbers = remainingNumbers.filter((num) => num[row] !== bit)

    if (remainingNumbers.length === 1) break

    row++

    rotatedNumberMatrix = remainingNumbers[0].map((_, colIndex) =>
      remainingNumbers.map((row) => row[colIndex])
    )
  }

  return parseInt(remainingNumbers.flatMap((row) => row).join(''), 2)
}

export const part1 = (input = parsedData) => {
  const gammaRate = rotateMatrix(input).map((num) => findCommonBit(num).bit)
  const epsilonRate = gammaRate.map((bit) => (bit === '1' ? '0' : '1'))
  return parseInt(gammaRate.join(''), 2) * parseInt(epsilonRate.join(''), 2)
}

export const part2 = (input = parsedData) => {
  const oxygenNumber = getSingleNumber(input, 'most', '1')
  const co2Number = getSingleNumber(input, 'least', '0')
  return oxygenNumber * co2Number
}

export default {
  part1,
  part2,
}
