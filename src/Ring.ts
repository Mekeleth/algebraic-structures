import AlgebraicStructure from './helpers/interfaces'
import { isNeutral, isAssociative, isCommutative, isDistributive } from './helpers/functions'
import AbelianGroup from './Group'

class Ring<T> extends AbelianGroup<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public multiply: (x: T, y: T) => T, public inverse: (x: T) => T) {
    super(set, neutral, add, inverse)

    let setCopy: T[] = set
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T, b: T

    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]
      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]
        b = set[Math.floor(Math.random() * set.length)]

        if (!isAssociative(multiply, a, b, subArray[i])) throw new Error('The multiplicative operation is not associative.')

        if (!isDistributive(add, multiply, a, b, subArray[i])) throw new Error('The operations are not distributive.')
      }
    }
  }
}

class CommutativeRing<T> extends Ring<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public multiply: (x: T, y: T) => T, public inverse: (x: T) => T) {
    super(set, neutral, add, multiply, inverse)

    let setCopy: T[] = set
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T

    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]
      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]

        if (!isCommutative(multiply, subArray[i], a)) throw new Error('The multiplicative operation is not commutative.')
      }
    }
  }
}

class UnitaryRing<T> extends Ring<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutralAdd: T, public add: (x: T, y: T) => T, public neutralMultiply: T, public multiply: (x: T, y: T) => T, public inverse: (x: T) => T) {
    super(set, neutralAdd, add, multiply, inverse)

    let setCopy: T[] = set
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))

    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]
      if (!isNeutral(multiply, neutralMultiply, subArray[i])) throw new Error('Either given element is not neutral or the multiplicative operation is incorrectly defined.')
    }
  }
}

export { Ring, CommutativeRing, UnitaryRing }
export default CommutativeRing
