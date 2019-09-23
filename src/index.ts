import { Group, AbelianGroup } from './Group'

let x = new AbelianGroup<number>((x:number,y:number) => 2*x+y, 0)
console.log(x.add(3,x.neutral))
