export class RNG {
constructor(private seed = 1337) {}
next() {
// xorshift32
let x = this.seed | 0;
x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
this.seed = x;
return (x >>> 0) / 0xFFFFFFFF;
}
}