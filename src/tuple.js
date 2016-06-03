/**
 * A simple tuple implementation.
 *
 * The tuple is represented by a frozen Array. To construct a tuple,
 * either an array of values or a list of arguments can be passed.
 * The ability to pass a list is important due to the fact that,
 * for methods such as `insertAt()`, the tuple must be thawed out
 * to allow a modified copy to be created.
 * Similarly, when no arguments are passed, it is important that
 * this is converted to an empty Array so all methods operate correctly.
 */
function Tuple(...args) {
  /* Var used to hold the internal representation of the Tuple. */
  let _tuple
  /* Ensure the function used to create the Tuple
   * can accept either a list of values or an
   * Array of values. Defaults to an empty Array. */
  if (args.length === 0) {
    _tuple = []
  } else if (args.length === 1 && Array.isArray(args[0])) {
    _tuple = args[0]
  } else {
    _tuple = args
  }

  /* Methods created by explicitly defining properties
   * on the tuple. Avoids `this` entirely. */
  Object.defineProperties(_tuple, {
    /**
     * Returns a new Tuple with the specified
     * value appended to the original. Equivalent
     * of `Array.prototype.push`, but returns the tuple.
     *
     * @param  {*} val      A single value to add.
     * @return {Tuple}
     */
    append: { value: (val) => {
        const tup = _tuple.toArr()
        tup.push(val)
        return Tuple(tup)
      }
    },
    /**
     * Returns a new Tuple, less the value at the index specified.
     *
     * @param  {integer} index    The index at which to delete.
     * @return {Tuple}
     */
    deleteAt: { value: (index) => {
        const tup = _tuple.toArr()
        tup.splice(index, 1)
        return Tuple(tup)
      }
    },
    /**
     * Prototype version of `Tuple.duplicate()`, allowing it
     * to be chained to other Tuple methods.
     * Fills an empty Tuple with `n` of `val`.
     *
     * @param  {*}       val      A single value to add.
     * @param  {integer} n        Number of times to duplicate the value.
     * @return {Tuple}
     */
    duplicate: { value: (val, n) => {
        if (_tuple.length !== 0) throw new RangeError(`The 'duplicate()' method expects to be given an empty tuple, *eg* 'Tuple().duplicate('foo', 3)'`)
        return Tuple(Array(n).fill(val))
      }
    },
    /**
     * Checks the tuple against another tuple, returns true
     * if all values are identical.
     *
     * @param  {Tuple}      tuple2      Tuple to compare current tuple to.
     * @return {boolean}
     */
    eq: { value: (tuple2) => _tuple.every((v, i) => v === tuple2[i]) },
    /**
     * Returns a new Tuple, with a value added at the index specified.
     *
     * @param  {integer} index    The index at which to delete.
     * @param  {*}       value    The value to insert.
     * @return {Tuple}
     */
    insertAt: { value: (index, value) => {
        const tup = _tuple.toArr()
        tup.splice(index, 0, value)
        return Tuple(tup)
      },
    },
    /**
     * Returns a proper [fully mutable] Array version of the Tuple.
     *
     * @return {Array}
     */
    toArr: { value: () => Object.assign([], _tuple) },
    /**
     * Returns a string representation of the Tuple
     *
     * @return {String}
     */
    toStr: { value: () => `(${_tuple})` },
  })

  return Object.freeze(_tuple)
}

/**
 * Static version of `Tuple().duplicate()`.
 * Returns an empty Tuple with `n` of `val`.
 *
 * @param  {integer} index    The index at which to delete.
 * @param  {*}       value    The value to insert.
 * @return {Tuple}
 */
Tuple.duplicate = (val, n) => Tuple(Array(n).fill(val))

/**
 * Static date -> Tuple conversion.
 * Renders a date representation in the form of [year, month, date]
 *
 * @param  {Date} date   A date object
 * @return {Tuple(number, number, numer)}
 */
Tuple.fromDate = (date) => Tuple(date.getFullYear(), date.getMonth(), date.getDate())

/**
 * Static Date Tuple -> Date conversion.
 * Renders a date from [year, month, date]
 *
 * @param  {Tuple(number, number, number)} dateTuple
 * @return {Date}                                     A Date object
 */
Tuple.toDate   = (dateTuple) => new Date(dateTuple[0], dateTuple[1], dateTuple[2])

/**
 * NOTE: CJS `exports` used instead of ES6 `export`/`export default`.
 *       until such time as this is not an issue.
 */
module.exports = Tuple
