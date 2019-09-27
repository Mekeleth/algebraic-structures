import AlgebraicStructure from './helpers/interfaces'
import { isAssociative, isDistributive } from './helpers/functions'
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

export { Ring }
export default Ring
