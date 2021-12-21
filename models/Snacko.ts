const SNACKOS = [
  "🍑",
  "🍉",
  "🍓",
  "🍏",
  "🥦",
  "🥕",
  "🍌",
  "🍊",
  "🥔",
  "🥐",
  "🌭",
  "🍗",
  "🥩",
  "🐞",
];

export class Snacko {
  #x: number;
  #y: number;
  #snacko: string;

  constructor(maxDim: number) {
    this.#x = Math.ceil((Math.random() * 1000) % maxDim);
    this.#y = Math.ceil((Math.random() * 1000) % maxDim);
    this.#snacko = SNACKOS[Math.floor((Math.random() * 1000) % SNACKOS.length)];
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

  forCoordinates(x: number, y: number) {
    return this.isAt(x, y) ? this.#snacko : "";
  }
}
