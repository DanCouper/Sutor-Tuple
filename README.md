# Sutor-Tuple

[![Build Status](https://semaphoreci.com/api/v1/dancouper/sutor-tuple/branches/master/badge.svg)](https://semaphoreci.com/dancouper/sutor-tuple)

[![Coverage Status](https://coveralls.io/repos/github/DanCouper/Sutor-Tuple/badge.svg?branch=master)](https://coveralls.io/github/DanCouper/Sutor-Tuple?branch=master)

A tiny tuple implementation in JS, leveraging frozen arrays. May be of some use to someone. Needs work. Won't be terribly efficient. Includes translation to/from dates (that's *dates*, **not** *time* or *datetime*).

## Implementation notes

Arrays are used to represent the Tuples, as opposed to implementing by using Objects with an internal `tuple` property. This allows the tuple object to retain the standard accessor/enumeration methods, and vastly simplified both the implementation of the attached methods and the testing process.

The method used to build the objects is similar to that described by Doug Crockford in [this talk](http://vimeo.com/97419177) (Gist \[*originally by Mattias Petter Johansson*\] [here](https://gist.github.com/DanCouper/8c7807c2ee9b1b907675)). Properties are explicitly defined due to the return statement only returning the current `tuple` array object; I was having issues holding on to the current value (to allow transformation) until I switched to `Object.defineProperties()`.

Array mutator methods will fail (with an error in strict mode; if the module is compiled to ES5 & used under non-strict mode for some reason they will fail without warning). And any attempt to modify the properties directly will fail.

Array enumerator methods will work fine, but note they will act as normal and return Arrays, not Tuples; I didn't think there was much point reimplementing Tuple-specific enumerator methods beyond those included.


##  Methods

### `Tuple(...args)`

Returns a frozen Array, representing a Tuple. To construct the Tuple, either an array of values or a list of arguments can be passed.

```
> Tuple(1,2,3)
[1,2,3]
> Tuple([1,2,3])
[1,2,3]
> Tuple()
[]
```

### `Tuple.duplicate(val, n)`

Returns a Tuple filled with `n` of `val`.

```
> Tuple.duplicate('foo', 3)
['foo', 'foo', 'foo']
```


### `Tuple.fromDate(date)`

Given a Javascript `Date` object, returns tuple of the form `(year, month, date)`.

```
> const aDate = new Date('1986-04-25')
> Tuple.fromDate(aDate)
[1986, 4, 25]
```

### `Tuple.toDate(dateTuple)`

Given a tuple of the form `(year, month, date)`, returns a Javascript `Date` object that matches it.

```
> const aDate = Tuple(1986, 04, 25)
> Tuple.toDate(aDate)
1986-04-25T00:00:00.000Z
```

---

### `.append(val)`

Returns a new Tuple with the specified value appended to the original. Equivalent to `Array.prototype.push`, but returns the tuple.

```
> const t = Tuple(1,2,3)
> t.append(4)
[1, 2, 3, 4]
```

### `.deleteAt(index)`

Returns a new Tuple, less the value at the index specified.

```
> const t = Tuple(1,2,3)
> t.deleteAt(2)
[1, 2]
```

### `.duplicate(val, n)`

Prototype version of `Tuple.duplicate()`, allowing it to be chained to other Tuple methods. Fills an empty Tuple with `n` of `val`.

```
> const t = Tuple()
> t.duplicate('foo', 3)
['foo', 'foo', 'foo']
```

### `.eq(tuple2)`

Checks the tuple against another tuple, returns true if all values are identical and in the same order.

```
> const t = Tuple(1,2,3)
> t.eq(Tuple(1,2,3))
true

> t.eq(Tuple(3,2,1))
false
```

### `.insertAt(index, val)`

Returns a new Tuple, with a value added at the index specified.

```
> const t = Tuple(1,2,3)
> t.insertAt(0,0)
[0, 1, 2, 3]
```

### `.toArr()`

Returns a proper [fully mutable] Array version of the Tuple.

```
> const t = Tuple(1,2,3)
> t[0] = 0
// Throws a TypeError

> const a = t.toArr()
> a[0] = 0
> a
[0, 2, 3]
```

### `.toStr()`

Returns a string representation of the Tuple.

```
> const t = Tuple(1,2,3)
> t.toStr()
'(1,2,3)'
```

