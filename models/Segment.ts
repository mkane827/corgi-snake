import { Direction } from "../enums/Direction";

export class Segment {
  #x: number;
  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  get coordinates() {
    return { x: this.#x, y: this.#y };
  }

  isAtCoordinates(x: number, y: number) {
    return this.#x === x && this.#y === y;
  }

  moveTo(segment: Segment) {
    const { x, y } = segment.coordinates;
    this.#x = x;
    this.#y = y;
  }

  moveInDirection(direction: Direction) {
    switch (direction) {
      case Direction.UP:
        this.#y--;
        break;
      case Direction.DOWN:
        this.#y++;
        break;
      case Direction.LEFT:
        this.#x--;
        break;
      case Direction.RIGHT:
        this.#x++;
        break;
    }
  }

  isAt(x: number, y: number) {
    return this.#x === x && this.#y === y;
  }
}
