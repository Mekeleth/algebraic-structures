class Group<T> {
  constructor(public add: (x: T, y: T) => T, public neutral: T){
    // if(this.add(1, this.neutral) !== 1 || this.add(this.neutral, 1) !== this.neutral) throw new Error('The addition operation does not respect the law of neutral element.')
  }

}

class AbelianGroup<T> extends Group<T> {
  constructor(public add: (x: T, y: T) => T, public neutral: T) {
    super(add, neutral)
    // let x: T = <T>(new Number(Math.random()*100))
    // let y: T = <T>(new Number(Math.random()*100))
    // console.log(add(x,y))
    // if(add(x, y) !== add(y, x)) throw new Error('This group is not abelian.')
  }
}

export { Group, AbelianGroup }
export default AbelianGroup
