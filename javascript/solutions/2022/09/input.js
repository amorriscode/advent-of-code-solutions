import fs from 'fs'
import path from 'path'

export const getExampleInput = async (fileName = 'example.txt') =>
  fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, `inputs/2022/09/${fileName}`)
    )
    .toString()

export const getInput = async () =>
  fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, 'inputs/2022/09/input.txt')
    )
    .toString()
