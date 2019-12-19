#!/usr/bin/env node

import compileSchemas from './index'

async function cli () {
  const [ input, output ] = process.argv.slice(2)
  try {
    await compileSchemas(input, output)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

cli()
