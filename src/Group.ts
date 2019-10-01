import AlgebraicStructure from './helpers/interfaces'
import { isEqual, isNeutral, isAssociative, isCommutative, isPrime } from './helpers/functions'

class Group<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public inverse: (x: T) => T, neutralAdd?: T /*in case the group is multiplicative*/) {

    let setCopy: T[] = new Array(...set)
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T, b: T, inverted: T

    for (let i = 0; i < subArray.length; ++i) {
      do {
        subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]
        inverted = inverse(subArray[i])
      } while (neutralAdd !== undefined && isEqual(subArray[i], neutralAdd))
      // TODO: check if it is possible to check interiority of operation as well...
      // if (!set.includes(<number>add(subArray[i], Math.floor(Math.random() * set.length)))) throw new Error('The operation is not internal.')

      if (neutralAdd !== undefined) {
        if (!isPrime(set.length)) throw new Error('The operation is multiplicative - the amount of elements in the set must be prime.')
      }
      if (!isEqual(add(subArray[i], inverted), neutral) || !isEqual(add(inverted, subArray[i]), neutral)) throw new Error(`Inverse function is not compatible with the ${neutralAdd !== undefined ? 'multiplicative' : 'additive'} operation.`)

      if (!isNeutral(add, neutral, subArray[i])) throw new Error(`Either given element is not neutral or the ${neutralAdd !== undefined ? 'multiplicative' : 'additive'} operation is incorrectly defined.`)

      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]
        b = set[Math.floor(Math.random() * set.length)]

        if (!isAssociative(add, a, b, subArray[i])) throw new Error(`The ${neutralAdd !== undefined ? 'multiplicative' : 'additive'} operation is not associative.`)
      }
    }
  }
}

class AbelianGroup<T> extends Group<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public inverse: (x: T) => T, neutralAdd?: T) {
    super(set, neutral, add, inverse, neutralAdd)
    let setCopy: T[] = new Array(...set)

    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T

    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]

      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]

        if (!isCommutative(add, subArray[i], a)) throw new Error(`The ${neutralAdd !== undefined ? 'multiplicative' : 'additive'} operation is not commutative.`)
      }
    }
  }
}

export { Group, AbelianGroup }
export default AbelianGroup
