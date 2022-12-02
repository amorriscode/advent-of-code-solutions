import fs from 'fs'
import path from 'path'

export const example = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

export const getInput = async () =>
  await fs
    .readFileSync(
      path.resolve(process.env.NODE_PATH, 'inputs/2022/01/input.txt')
    )
    .toString()
