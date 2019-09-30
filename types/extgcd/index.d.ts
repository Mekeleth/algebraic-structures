declare module 'extgcd' {
  var extgcd: (x: number, y: number) => {
    gcd: number
    x: number
    y: number
  };
  export = extgcd;
}
