# Notable changes to Sutor-Tuple


## 1.1.0

**FIXED** import issue byt just using CJS `module.exports`

## 1.1.0
**BROKEN**. Investigation into import errors in 1.0.0.

## 1.0.0

**BROKEN**. Initial package release. Use of ES6 `export`/`export default` turns out to not be totally compatible with Node CJS. Package has to be used like `Tuple.Tuple(1,2,3)`.
