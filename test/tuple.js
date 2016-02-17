import test from 'ava'
import 'babel-core/register'
import 'babel-polyfill'

import Tuple from '../src/tuple'

test('Returns a tuple representation', (t) => {
  t.plan(1)
  t.same(Tuple(1,2,3).toArr(), [1,2,3])
})

test('Tuple is immutable; any attempt to mutate will throw whilst in strict mode', (t) => {
  t.plan(4)
  const tuple = Tuple(1,2,3)

  t.throws(() => tuple.tup[0] = 0, /Cannot assign to read only property '0'/)
  t.throws(() => tuple.len = 4, /Cannot assign to read only property 'len'/)
  t.throws(() => delete tuple.tup[0], /Cannot delete property '0'/)
  t.throws(() => tuple.tup.fill(0), /Cannot modify frozen/)
})

test('toStr returns a string representation', t => {
  t.plan(1)
  const input  = Tuple(1,2,3).toStr()
  const output = `(1,2,3)`
  t.same(input, output)
})
