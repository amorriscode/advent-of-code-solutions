import { sum } from '../../../lib'

export const parseInput = (input) =>
  input
    .split('$')
    .splice(1)
    .map((command) => command.trim())

class FileSystem {
  constructor() {
    const rootDir = new Directory('/')
    this.currDir = rootDir
    this.root = rootDir
  }

  cd(dirName) {
    if (dirName === this.currDir.name) {
      return
    }

    if (dirName === '..') {
      if (this.currDir.parent) this.currDir = this.currDir.parent
      return
    }

    if (!this.currDir?.tree[dirName]) {
      const dir = new Directory(dirName, this.currDir)
      this.currDir.tree[dirName] = dir
    }

    this.currDir = this.currDir.tree[dirName]
  }
}

class Directory {
  constructor(name, parent) {
    this.tree = {}
    this.files = []
    this.name = name
    this.parent = parent
    this._size = 0
  }

  getSize() {
    return (
      this._size +
      Object.values(this.tree || {}).reduce(
        (acc, curr) => acc + curr.getSize(),
        0
      )
    )
  }

  addFile(file) {
    this.files.push(file)
    this._size += file.size
  }
}

class File {
  constructor(name, size) {
    this.name = name
    this.size = size
  }
}

const constructFileSystem = (commands) => {
  const fileSystem = new FileSystem()

  for (const action of commands) {
    const [commandWithArgs, ...data] = action.split('\n')
    const [command, args] = commandWithArgs.split(' ')

    if (command === 'cd') {
      fileSystem.cd(args)
    }

    if (command === 'ls') {
      for (const item of data) {
        const [trait, name] = item.split(' ')

        if (trait === 'dir') {
          fileSystem.currDir.tree[name] = new Directory(
            name,
            fileSystem.currDir
          )
        } else {
          const file = new File(name, +trait)
          fileSystem.currDir.addFile(file)
        }
      }
    }
  }

  return fileSystem
}

const getFileSystemDirSizes = (fileSystem) => {
  const directories = [fileSystem.root]
  const dirSizes = []

  while (directories.length > 0) {
    const directory = directories.pop()
    dirSizes.push(directory.getSize())
    directories.push(...Object.values(directory.tree || {}))
  }

  return dirSizes
}

export const part1 = (input) => {
  return sum(
    getFileSystemDirSizes(constructFileSystem(input)).filter(
      (size) => size <= 100000
    )
  )
}

export const part2 = (input) => {
  const fileSystem = constructFileSystem(input)
  const unusedSpace = 70000000 - fileSystem.root.getSize()
  const requiredSize = 30000000 - unusedSpace
  return getFileSystemDirSizes(fileSystem)
    .sort((a, b) => a - b)
    .find((dirSize) => dirSize >= requiredSize)
}
