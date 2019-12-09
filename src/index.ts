import path from 'path'
import { compileFromFile } from 'json-schema-to-typescript'
import _fs from 'fs'
const fs = _fs.promises

const fileOutputPath = (file: string, output: string): string => {
  return path.join(output, `${path.basename(file, '.json')}.d.ts`)
}

async function compileSchemas (input: string, output: string): Promise<void> {
  const files = await fs.readdir(path.resolve(input))
  for (const file of files) {
    if (path.extname(file) === '.json') {
      const ts = await compileFromFile(path.join(input, file))
      await fs.writeFile(fileOutputPath(file, output), ts)
    }
  }
}

export = compileSchemas
