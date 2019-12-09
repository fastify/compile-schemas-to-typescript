// Until https://github.com/tapjs/node-tap/pull/607 is merged tests will be authored in JavaScript
'use strict'

const compileSchemas = require('../build/index.js')
const fs = require('fs')
const tap = require('tap')



tap.test('compileSchemas', async t => {
  t.plan(2)

  t.tearDown(async () => {
    await fs.promises.rmdir('./test/types', { recursive: true })
  })

  try {
    await fs.promises.mkdir('./test/types')
    await compileSchemas('./test/schemas', './test/types')
    const files = await fs.promises.readdir('./test/types')
    t.ok(files.length === 1, 'should generate 1 file')
    t.ok(files[0] === 'foo.d.ts', 'should generate file with name `foo.d.ts`')
  } catch (error) {
    t.error(error)
  }
})