import fs from 'fs'
import path from 'path'

export const getInput = async ({ year, day, fileName }) =>
  fs
    .readFileSync(
      path.resolve(
        process.env.NODE_PATH,
        `inputs/${year}/${day}/${fileName}.txt`
      )
    )
    .toString()

export const product = (arr) => {
  return arr.reduce((a, b) => a * b)
}

// Modular multiplicative inverse
// https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
// x where `ax % m == 1`
export const bigIntModMulInverse = (a, m) => {
  let b = a % m

  for (let i = 1n; i < m; ++i) {
    if ((b * i) % m == 1n) {
      return i
    }
  }

  return 1n
}

// Chinese remainder theorem
// https://en.wikipedia.org/wiki/Chinese_remainder_theorem
// x where `x % Ni == Ai` for all i
export const bigIntChineseRemainder = (A, N) => {
  let prod = product(N)
  let p
  let sum = 0n

  for (let i = 0; i < A.length; ++i) {
    p = prod / N[i]
    sum += A[i] * p * bigIntModMulInverse(p, N[i])
  }

  return sum % prod
}

export const modulo = (x, m) => {
  while (x < 0) x += m
  return x % m
}

export const rotateMatrix = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]))

export const sum = (arr) => arr.reduce((a, b) => a + b, 0)

export const setIntersection = (setA, setB) => {
  return new Set([...setA].filter((element) => setB.has(element)))
}
