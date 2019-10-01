import AlgebraicStructure from './helpers/interfaces'
import { AbelianGroup } from './Group'
import { isDistributive } from './helpers/functions'

class Field<T> extends AbelianGroup<T> implements AlgebraicStructure<T> {
  constructor(public set: T[], public neutralAdd: T, public add: (x: T, y: T) => T, public neutralMultiply: T, public multiply: (x: T, y: T) => T, public inverseAdd: (x: T) => T, public inverseMultiply: (x: T) => T) {
    super(set, neutralAdd, add, inverseAdd)
    // super(set, neutralMultiply, multiply, inverseMultiply, false)
    const multiplicativeAbelianGroup: AbelianGroup<T> = new AbelianGroup<T>(set, neutralMultiply, multiply, inverseMultiply, neutralAdd)

    let setCopy: T[] = new Array(...set)
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T, b: T

    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]

      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]
        b = set[Math.floor(Math.random() * set.length)]

        if (!isDistributive(add, multiply, a, b, subArray[i])) throw new Error('The operations are not distributive.')
      }
    }
  }
}

export { Field }
export default Field
