'use strict'

const test = require('tape')
const ModuleError = require('.')

test('basic', function (t) {
  t.is(new ModuleError('test').message, 'test')
  t.is(new ModuleError().message, '')
  t.is(new ModuleError(null).message, '')
  t.is(new ModuleError().code, undefined)
  t.is(new ModuleError().cause, undefined)
  t.is(new ModuleError().expected, undefined)
  t.is(new ModuleError().transient, undefined)
  t.ok(new ModuleError() instanceof Error)
  t.end()
})

test('code', function (t) {
  for (const code of ['TEST', 123]) {
    const err = new ModuleError('test', { code })

    t.same(Object.getOwnPropertyDescriptor(err, 'code'), {
      value: String(code),
      writable: true,
      enumerable: true,
      configurable: true
    })
  }

  t.end()
})

test('cause', function (t) {
  const cause = new Error('x')
  const err = new ModuleError('test', { cause })

  t.same(Object.getOwnPropertyDescriptor(err, 'cause'), {
    value: cause,
    writable: true,
    enumerable: true,
    configurable: true
  })

  t.end()
})

for (const property of ['expected', 'transient']) {
  test(`${property} with truthy value`, function (t) {
    for (const value of [true, 123]) {
      const err = new ModuleError('test', { [property]: value })

      t.same(Object.getOwnPropertyDescriptor(err, property), {
        value: true,
        writable: true,
        enumerable: true,
        configurable: true
      })
    }

    t.end()
  })

  test(`${property} with non truthy value`, function (t) {
    for (const value of [false, null, 0]) {
      const err = new ModuleError('test', { [property]: value })
      t.is(Object.getOwnPropertyDescriptor(err, property), undefined)
    }

    t.end()
  })
}
