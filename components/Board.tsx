import React, { useState, useRef } from "react";
import useInterval from "react-useinterval";
import { Direction } from "../enums/Direction";
import { Snacko } from "../models/Snacko";
import { Snake } from "../models/Snake";
import { Cell } from "./Cell";
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
            <tr>
              {DIMS.map((x) => (
                <Cell x={x} y={y} snake={snake.current} snacko={snacko} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
