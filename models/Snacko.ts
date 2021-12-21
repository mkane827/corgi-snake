export class Snacko {
  #x: number;
  #y: number;

  constructor(maxDim: number) {
    this.#x = Math.ceil((Math.random() * 1000) % maxDim);
    this.#y = Math.ceil((Math.random() * 1000) % maxDim);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  isAt(x: number, y: number) {
    return this.#x === x && this.#y === y;
  }
}
