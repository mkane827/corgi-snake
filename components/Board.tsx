import React, { useState, useRef } from "react";
import useInterval from "react-useinterval";
import corgi from "../assets/corgi.png";
import { Direction } from "../enums/Direction";
import { Snacko } from "../models/Snacko";
import { Snake } from "../models/Snake";
import { PlayButton } from "./PlayButton";

const MAX_DIM = 20;
const TICK_SPEED = 200;

const DIMS = [];
for (let i = 1; i <= MAX_DIM; i++) {
  DIMS.push(i);
}

export function Board() {
  const snake = useRef(new Snake());
  const [tick, setTick] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snacko, setSnacko] = useState(new Snacko(MAX_DIM));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useInterval(() => {
    if (isPlaying) {
      snake.current.move();
      if (snake.current.head.isAt(snacko.x, snacko.y)) {
        setScore(score + 1);
        setSnacko(new Snacko(MAX_DIM));
        snake.current.nom();
      }
    }
    setTick(tick + 1);

    if (snake.current.check(MAX_DIM)) {
      setIsPlaying(false);
      setIsGameOver(true);
    }
  }, TICK_SPEED);

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

  function getCellClasses(x: number, y: number) {
    if (snake.current.hasSegmentAt(x, y)) {
      return `snake ${
        snake.current.isHeadAt(x, y)
          ? `head ${getDirectionClass(snake.current.direction)}`
          : ""
      } ${
        snake.current.isButtAt(x, y)
          ? `butt ${getDirectionClass(snake.current.buttDirection)}`
          : ""
      }`;
    }

    if (snacko.isAt(x, y)) {
      return "snacko";
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    e.preventDefault();
    switch (e.code) {
      case "ArrowUp":
        snake.current.direction = Direction.UP;
        break;
      case "ArrowDown":
        snake.current.direction = Direction.DOWN;
        break;
      case "ArrowLeft":
        snake.current.direction = Direction.LEFT;
        break;
      case "ArrowRight":
        snake.current.direction = Direction.RIGHT;
        break;
    }
  }

  function getCellContent(x: number, y: number) {
    if (snake.current.head.isAt(x, y)) {
      return <img src={corgi} />;
    }
    return <span>{snacko.forCoordinates(x, y)}</span>;
  }

  return (
    <div>
      <PlayButton
        handleKeyPress={handleKeyPress}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
      />
      <h1>
        {score}{" "}
        <span className="game-over">{isGameOver ? "GAME OVER" : ""}</span>
      </h1>
      <table>
        <tbody>
          {DIMS.map((y) => (
            <tr key={y}>
              {DIMS.map((x) => (
                <td key={x} className={getCellClasses(x, y)}>
                  {getCellContent(x, y)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
