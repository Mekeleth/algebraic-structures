function isEqual<T>(firstValue: T, secondValue: T): boolean {
  return firstValue === secondValue && Object.is(firstValue, secondValue)
}

function isNeutral<T>(operation: (x: T, y: T) => T, neutral: T, a: T): boolean {
  return isEqual<T>(operation(a, neutral), a) && isEqual<T>(operation(neutral, a), a)
}

function isAssociative<T>(operation: (x: T, y: T) => T, a: T, b: T, c: T): boolean {
  const firstCase: boolean = isEqual<T>(operation(operation(a, b), c), operation(a, operation(b, c)))
  const secondCase: boolean = isEqual<T>(operation(operation(c, a), b), operation(c, operation(a, b)))
  const thirdCase: boolean = isEqual<T>(operation(operation(a, c), b), operation(a, operation(c, b)))
  return firstCase && secondCase && thirdCase
}

function isCommutative<T>(operation: (x: T, y: T) => T, a: T, b: T): boolean {
  return isEqual<T>(operation(a, b), operation(b, a))
}

function isDistributive<T>(add: (x: T, y: T) => T, multiply: (x: T, y: T) => T, a: T, b: T, c: T): boolean {
  const firstCase: boolean = isEqual<T>(multiply(a, add(b, c)), add(multiply(a, b), multiply(a, c))) && isEqual<T>(multiply(add(b, c), a), add(multiply(b, a), multiply(c, a)))
  const secondCase: boolean = isEqual<T>(multiply(c, add(a, b)), add(multiply(c, a), multiply(c, b))) && isEqual<T>(multiply(add(a, b), c), add(multiply(a, c), multiply(b, c)))
  const thirdCase: boolean = isEqual<T>(multiply(b, add(c, a)), add(multiply(b, c), multiply(b, a))) && isEqual<T>(multiply(add(c, a), b), add(multiply(c, b), multiply(a, b)))
  return firstCase && secondCase && thirdCase
}


export { isNeutral, isAssociative, isCommutative, isDistributive }
export default isAssociative
