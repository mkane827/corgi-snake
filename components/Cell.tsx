import { Direction } from "../enums/Direction";
import corgi from "../assets/corgi.png";

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
    if (snake.head.isAt(x, y)) {
      return <img src={corgi} />;
    }
    return <span>{snacko.forCoordinates(x, y)}</span>;
  }

  return <td className={getCellClasses(x, y)}>{getCellContent(x, y)}</td>;
}
