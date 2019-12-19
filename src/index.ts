import path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import _fs from 'fs'
const fs = _fs.promises

const fileOutputPath = (file: string, output: string): string => {
  return path.join(output, `${path.basename(file, '.json')}.d.ts`)
}

async function compileSchemas (input: string, output: string): Promise<void> {
  if (!input || !output) {
    throw new Error('Input and Output paths must be specified')
  }

  // create output dir - skip eexist error
  try {
    await fs.mkdir(path.resolve(output))
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }

  // get files from input dir
  const files = await fs.readdir(path.resolve(input))

  for (const file of files) {
    if (path.extname(file) === '.json') { // for every `.json` file in the input
      const ts = await compileFromFile(path.join(input, file)) // compile to ts
      await fs.writeFile(path.resolve(fileOutputPath(file, output)), ts) // write to output
    }
  }
}

export = compileSchemas
