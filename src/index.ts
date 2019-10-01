import extgcd from 'extgcd'
import AbelianGroup from './Group'
import CommutativeRing from './Ring'
import Field from './Field'

// const group = new AbelianGroup<number>([...Array(100).keys()], 98, (x: number, y: number) => (x + y + 2) % 100, (x: number) => 96 - x % 100)

// const ring = new CommutativeRing<number>([...Array(4).keys()], 0, (x: number, y: number) => (x + y) % 4, (x: number, y: number) => (x * y) % 4, (x: number) => 4 - x)

const field = new Field<number>([...Array(17).keys()], 0, (x: number, y: number) => (x + y) % 17, 1, (x: number, y: number) => (x * y) % 17, (x: number) => 17 - x, (x: number) => extgcd(x, 17).x < 0 ? 17 + extgcd(x, 17).x : extgcd(x, 17).x)
