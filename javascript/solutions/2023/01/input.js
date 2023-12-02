import fs from 'fs'
import path from 'path'

export const getInput = async (fileName) =>
  fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, `inputs/2023/01/${fileName}.txt`)
    )
    .toString()
