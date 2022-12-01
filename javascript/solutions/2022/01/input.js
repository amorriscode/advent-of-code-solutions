import fs from 'fs'

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
  await fs.readFileSync('../input/2022/day1.txt').toString()
