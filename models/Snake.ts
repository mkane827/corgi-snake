import { Direction } from "../enums/Direction";
import { Segment } from "./Segment";

export class Snake {
  #body: Segment[];
  #direction: Direction;

  constructor() {
    this.#body = [
      new Segment(10, 10),
      new Segment(10, 11),
      new Segment(10, 12),
      new Segment(10, 13),
    ];
    this.#direction = Direction.UP;
  }

  get head() {
    return this.#body[0];
  }

  set direction(direction: Direction) {
    const { x, y } = this.head.coordinates;
    if (
      (direction === Direction.DOWN && this.hasSegmentAt(x, y + 1)) ||
      (direction === Direction.UP && this.hasSegmentAt(x, y - 1)) ||
      (direction === Direction.RIGHT && this.hasSegmentAt(x + 1, y)) ||
      (direction === Direction.LEFT && this.hasSegmentAt(x - 1, y))
    ) {
      return;
    }
    this.#direction = direction;
  }

  get length() {
    return this.#body.length;
  }

  move() {
    for (let i = this.#body.length - 1; i > 0; i--) {
      this.segmentAt(i).moveTo(this.segmentAt(i - 1));
    }
    this.head.moveInDirection(this.#direction);
  }

  segmentAt(index: number) {
    return this.#body[index];
  }

  check(maxX = 20, maxY = 20) {
    const found = {};
    return this.#body.reduce((gameOver, segment) => {
      if (gameOver) return gameOver;
      const { x, y } = segment.coordinates;

      if (x > maxX || x < 1 || y > maxY || y < 1) return true;

      if (found[x] && found[x][y]) return true;

      if (!found[x]) {
        found[x] = {};
      }

      found[x][y] = true;
      return false;
    }, false);
  }

  hasSegmentAt(x: number, y: number) {
    return this.#body.reduce(
      (hit, segment) => hit || segment.isAt(x, y),
      false
    );
  }

  nom() {
    const { x: x1, y: y1 } = this.#body[this.length - 1].coordinates;
    const { x: x2, y: y2 } = this.#body[this.length - 2].coordinates;
    this.#body.push(new Segment(2 * x1 - x2, 2 * y1 - y2));
  }
}
