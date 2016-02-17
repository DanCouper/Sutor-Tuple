# Sutor-Tuple

A tiny tuple implementation in JS, using frozen arrays (*WIP, very raw at the minute*).

Arrays are used to represent the Tuples, as opposed to implementing by using Objects with an internal `tuple` property. This allows the tuple object to retain the standard accessor/enumeration methods, and vastly simplified both the implementation of the attached methods and the testing process.

The method used to build the objects is similar to that described by Doug Crockford in [this talk](http://vimeo.com/97419177) (Gist \[*originally by Mattias Petter Johansson*\] [here](https://gist.github.com/DanCouper/8c7807c2ee9b1b907675)). Properties are explicitly defined due to the return statement only returning the current `tuple` array object; I was having issues holding on to the current value (to allow transformation) until I switched to `Object.defineProperties()`.

Array mutator methods will fail (with an error in strict mode; if the module is compiled to ES5 & used under non-strict mode for some reason they will fail without warning). And any attempt to modify the properties directly will fail.

Array enumerator methods will work fine, but note they will act as normal and return Arrays, not Tuples; I didn't think there was much point reimplementing Tuple-specific enumerator methods beyond those included.
