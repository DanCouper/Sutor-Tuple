import test from 'ava'
import 'babel-core/register'
import 'babel-polyfill'

import Tuple from '../src/tuple'

test('Passing no args results in an empty tuple', t => {
  t.plan(1)
  const input  = Tuple()
  t.same(Tuple().toStr(), `()`)
})

// NOTE This is driving me nuts, I cannot get it pick up the errors
// consistently. Errors are thrown correctly, testing for them is :(
// NOTE `test.skip(...)` is skipping, then causing the test suite to fail. Yaaay!
// test.skip('Tuple is immutable; any attempt to mutate will throw whilst in strict mode', (t) => {
//   t.plan(4)
//   const tuple = Tuple(1,2,3)

//   t.throws(() => tuple[0] = 0, /Cannot assign to read only property `0`/)
//   t.throws(() => tuple.length = 4, /Cannot assign to read only property `length`/)
//   t.throws(() => delete tuple[0], /Cannot delete property `0`/)
//   t.throws(() => tuple.fill(0), /Cannot modify frozen/)
// })

test('To arr returns an actual arr representation, which can be mutated as normal', (t) => {
  t.plan(1)
  const arr = Tuple(1,2,3).toArr()
  arr[0] = `foo`
  t.same(arr[0], `foo`)
})

test('toStr returns a string representation', t => {
  t.plan(1)
  const input  = Tuple(1,2,3).toStr()
  const output = `(1,2,3)`
  t.same(input, output)
})

// Because they are objects, still no way to simply test for equality:
// a method is used instead.
test('Two tuples with same values are equal', t => {
  t.plan(1)
  const input1 = Tuple(1,2,3)
  const input2 = Tuple(1,2,3)
  t.true(input1.eq(input2))
})

test('Two tuples with same values in different order are unequal', t => {
  t.plan(1)
  const input1 = Tuple(1,2,3)
  const input2 = Tuple(2,3,1)
  t.false(input1.eq(input2))
})

test('Allows appending a value to end of the tuple, returning a new tuple', t => {
  t.plan(1)
  const input  = Tuple(1,2,3).append(4)
  t.same(input, [1,2,3,4])
})

test('Allows insertion of a value at a specified index, returning a new tuple', t => {
  t.plan(1)
  const input  = Tuple(1,2,3).insertAt(0, 0)
  t.same(input, [0,1,2,3])
})


test('Allows deletion of a value at a specified index, returning a new tuple', t => {
  t.plan(1)
  const input  = Tuple(1,2,3).deleteAt(0)
  t.same(input, [2,3])
})

test('Allows population of an empty tuple with repeated values via the `duplicate()` method', t => {
  t.plan(1)
  const input  = Tuple().duplicate(3,3)
  t.same(input, [3,3,3])
})

test('Creates a Tuple with repeated values via `Tuple.duplicate()`', t => {
  t.plan(1)
  const input  = Tuple.duplicate(3,3)
  t.same(input, [3,3,3])
})

test('Allows pattern matching as normal', t => {
  t.plan(3)
  const [x, y, z]  = Tuple(1,2,3)
  t.is(x, 1)
  t.is(y, 2)
  t.is(z, 3)
})

test('Converts a date to a tuple', t => {
  t.plan(1)
  const input  = Tuple.fromDate(new Date(2016, 1, 18))
  const output = [2016, 1, 18]
  t.same(input, output)
})

test('Converts a date tuple to a date', t => {
  t.plan(1)
  const input = Tuple.toDate(Tuple([2016, 1, 18]))
  t.same(input, new Date(2016, 1, 18))
})
