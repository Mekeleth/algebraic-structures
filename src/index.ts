import { Group, AbelianGroup } from './Group'

let x = new AbelianGroup<number>([...Array(100).keys()], 98, (x: number, y: number) => (x + y + 2) % 100, (x: number) => 98 - (x + 2) % 100)
