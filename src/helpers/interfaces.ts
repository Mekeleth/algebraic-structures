interface AlgebraicStructure<T> {
  set: T[]
  neutralAdd: T
  neutralMultiply?: T
  add(x: T, y: T): T
  multiply?(x: T, y: T): T
  inverseAdd(x: T): T
  inverseMultiply?(x: T): T
}

export { AlgebraicStructure }
export default AlgebraicStructure
