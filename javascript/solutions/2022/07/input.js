import fs from 'fs'
import path from 'path'

export const getExampleInput = async () =>
  fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, 'inputs/2022/07/example.txt')
    )
    .toString()

export const getInput = async () =>
  fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, 'inputs/2022/07/input.txt')
    )
    .toString()
