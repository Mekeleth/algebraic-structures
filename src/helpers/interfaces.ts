interface AlgebraicStructure<T> {
  set: T[]
  neutral: T
  add(x: T, y: T): T
  inverse(x: T): T
  multiply?(x: T, y: T): T
}

export { AlgebraicStructure }
export default AlgebraicStructure
