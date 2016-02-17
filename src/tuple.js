/**
 * A simple tuple implementation.
 */
export default (...args) => {
  const tup   = Object.freeze(args)
  const eq    = (tuple2) => tup.every((v, i) => v === tuple2[i])
  const len   = tup.length

  const toArr = () => tup
  const toStr = () => `(${tup})`

  return Object.freeze({
    tup,
    eq,
    len,
    toArr,
    toStr
  })
}
