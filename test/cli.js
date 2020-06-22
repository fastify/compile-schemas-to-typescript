'use strict';

const compileSchemas = require('../build/index.js')
const path = require('path');
const fs = require('fs')
const tap = require('tap')
const rmdir = require('rimraf')
const { execSync } = require('child_process')

const cliPath = path.join(__dirname, '..', 'build', 'cli.js');
tap.test('cli', async t => {
  t.plan(2)

  t.tearDown(() => {
    rmdir.sync('./test/types')
  })

  execSync(`${process.execPath} ${cliPath} test/schemas test/types`)

  try {
    const files = await fs.promises.readdir('./test/types')
    t.ok(files.length === 1, 'should generate 1 file')
    t.ok(files[0] === 'foo.d.ts', 'should generate file with name `foo.d.ts`')
  } catch (error) {
    t.error(error)
  }

})
