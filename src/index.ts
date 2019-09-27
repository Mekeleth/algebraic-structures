import { Group, AbelianGroup } from './Group'
import { Ring } from './Ring'

let group = new AbelianGroup<number>([...Array(100).keys()], 98, (x: number, y: number) => (x + y + 2) % 100, (x: number) => 96 - x % 100)

let ring = new Ring<number>([...Array(4).keys()], 0, (x: number, y: number) => (x + y) % 4, (x: number, y: number) => (x * y) % 4, (x: number) => 4 - x)
