import { Direction } from "../enums/Direction";
import corgiHead1 from "../assets/corgi-head-1.png";
import corgiHead2 from "../assets/corgi-head-2.png";
import corgiHead3 from "../assets/corgi-head-3.png";
import corgiHead4 from "../assets/corgi-head-4.png";
import corgiHead5 from "../assets/corgi-head-5.png";
import corgiHead6 from "../assets/corgi-head-6.png";
import corgiButt1 from "../assets/corgi-butt-1.png";
import corgiButt2 from "../assets/corgi-butt-2.png";
import corgiButt3 from "../assets/corgi-butt-3.png";
import corgiButt4 from "../assets/corgi-butt-4.png";
import corgiButt5 from "../assets/corgi-butt-5.png";
import corgiButt6 from "../assets/corgi-butt-6.png";

const HEADS = [
  corgiHead1,
  corgiHead2,
  corgiHead3,
  corgiHead4,
  corgiHead5,
  corgiHead6,
];
const BUTTS = [
  corgiButt1,
  corgiButt2,
  corgiButt3,
  corgiButt4,
  corgiButt5,
  corgiButt6,
];

export function Cell({ snake, snacko, x, y }) {
  function getCellClasses(x: number, y: number) {
    if (snake.hasSegmentAt(x, y)) {
      return `snake ${
        snake.isHeadAt(x, y) ? `head ${getDirectionClass(snake.direction)}` : ""
      } ${
        snake.isButtAt(x, y)
          ? `butt ${getDirectionClass(snake.buttDirection)}`
          : ""
      }`;
    }

    if (snacko.isAt(x, y)) {
      return "snacko";
    }
  }

  function getDirectionClass(direction) {
    switch (direction) {
      case Direction.UP:
        return "up";
      case Direction.DOWN:
        return "down";
      case Direction.LEFT:
        return "left";
      case Direction.RIGHT:
        return "right";
      default:
        return "wat";
    }
  }

  function getCellContent(x: number, y: number) {
    if (snake.isHeadAt(x, y)) {
      return <img src={HEADS[snake.corgiIndex]} />;
    }

    if (snake.isButtAt(x, y)) {
      return <img src={BUTTS[snake.corgiIndex]} />;
    }

    return <span>{snacko.forCoordinates(x, y)}</span>;
  }

  return <td className={getCellClasses(x, y)}>{getCellContent(x, y)}</td>;
}
