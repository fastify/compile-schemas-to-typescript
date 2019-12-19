// Until https://github.com/tapjs/node-tap/pull/607 is merged tests will be authored in JavaScript
'use strict'

const compileSchemas = require('../build/index.js')
const fs = require('fs')
const tap = require('tap')
const rmdir = require('rimraf')

tap.test('compileSchemas', t => {

  t.test('should correctly export typescript interface', async t => {
    t.plan(2)
  
    t.tearDown(() => {
      // await fs.promises.rmdir('./test/types', { recursive: true }) // only works on Node12 using rimraf for now
      rmdir.sync('./test/types')
    })
  
    try {
      await compileSchemas('./test/schemas', './test/types')
      const files = await fs.promises.readdir('./test/types')
      t.ok(files.length === 1, 'should generate 1 file')
      t.ok(files[0] === 'foo.d.ts', 'should generate file with name `foo.d.ts`')
    } catch (error) {
      t.error(error)
    }
  })

  t.test('should error on', t => {

    t.test('both arguments missing', async t => {
      t.plan(1)

      try {
        await compileSchemas()
      } catch (error) {
        t.equal(error.message, 'Input and Output paths must be specified')
      }
    })

    t.test('one argument is missing', async t => {
      t.plan(1)

      try {
        await compileSchemas('input')
      } catch (error) {
        t.equal(error.message, 'Input and Output paths must be specified')
      }
    })

    t.end()
  })

  t.end()
})