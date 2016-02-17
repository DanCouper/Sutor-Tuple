/**
 * A simple tuple implementation.
 */
export default function Tuple(...args) {
  /* The tuple is represented by a frozen Array. To construct a tuple,
   * either an array of values or a list of arguments can be passed.
   * The ability to pass a list is important due to the fact that,
   * for methods such as `insertAt()`, the tuple must be thawed out
   * to allow a modified copy to be created.
   * Similarly, when no arguments are passed, it is important that
   * this is converted to an empty Array so all methods operate correctly.*/
  let tuple

  if (args.length === 0) {
    tuple = []
  } else if (args.length === 1 && Array.isArray(args[0])) {
    tuple = args[0]
  } else {
    tuple = args
  }

  /* Methods created by explicitly defining properties
   * on the tuple. Avoids `this` entirely. */
  Object.defineProperties(tuple, {
    append:  { value: (val) => {
        const tup = tuple.toArr()
        tup.push(val)
        return Tuple(tup)
      }
    },
    deleteAt:  { value: (index) => {
        const tup = tuple.toArr()
        tup.splice(index, 1)
        return Tuple(tup)
      }
    },
    duplicate: { value: (val, n) => {
        if(tuple.length !== 0) throw new RangeError(`The 'duplicate()' method expects to be given an empty tuple, *eg* 'Tuple().duplicate('foo', 3)'`)
        return Tuple(Array(n).fill(val))
      }
    },
    eq:        { value: (tuple2) => tuple.every((v, i) => v === tuple2[i]) },
    insertAt:  { value: (index, value) => {
        const tup = tuple.toArr()
        tup.splice(index, 0, value)
        return Tuple(tup)
      }
    },
    toArr:     { value: () => Object.assign([], tuple) },
    toStr:     { value: () => `(${tuple})` }
  })

  return Object.freeze(tuple)
}
