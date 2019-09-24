class Group<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public inverse: (x: T) => T) {
    let setCopy: T[] = set
    let subArray: T[] = new Array(Math.ceil(Math.sqrt(setCopy.length)))
    let a: T, b: T, inverted: T
    for (let i = 0; i < subArray.length; ++i) {
      subArray[i] = setCopy.splice(Math.floor(Math.random() * setCopy.length), 1)[0]

      // if (!set.includes(<number>add(subArray[i], Math.floor(Math.random() * set.length)))) throw new Error('The operation is not internal.')

      inverted = add(neutral, inverse(subArray[i]))
      console.log(subArray[i])
      console.log({ inverted })
      if (!Object.is(add(subArray[i], inverted), neutral) || !Object.is(add(inverted, subArray[i]), neutral)) {
        throw new Error('Inverse function is not harmonized correctly with addition operation.')
      }

      if (add(subArray[i], neutral) !== subArray[i] || add(neutral, subArray[i]) !== subArray[i]) throw new Error('Either given element is not neutral or the operation is incorrectly defined.')

      for (let j = 0; j < Math.ceil(Math.sqrt(set.length)); ++j) {
        a = set[Math.floor(Math.random() * set.length)]
        b = set[Math.floor(Math.random() * set.length)]

        if (add(add(subArray[i], a), b) !== add(subArray[i], add(a, b)) && !Object.is(add(add(subArray[i], a), b), add(subArray[i], add(a, b)))) throw new Error('The operation is not associative.')
      }
    }
  }

}

class AbelianGroup<T> extends Group<T> {
  constructor(public set: T[], public neutral: T, public add: (x: T, y: T) => T, public inverse: (x: T) => T) {
    super(set, neutral, add, inverse)
  }
}

console.log(typeof Symbol('ss'))

export { Group, AbelianGroup }
export default AbelianGroup
