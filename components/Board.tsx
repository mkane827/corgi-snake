import React, { useState, useRef } from "react";
import useInterval from "react-useinterval";
import { Direction } from "../enums/Direction";
import { Snacko } from "../models/Snacko";
import { Snake } from "../models/Snake";
import { Cell } from "./Cell";
import { PlayButton } from "./PlayButton";
import { SpeedSelector } from "./SpeedSelector";

const MAX_DIM = 20;
const TICK_SPEED = 100;

const DIMS = [];
for (let i = 1; i <= MAX_DIM; i++) {
  DIMS.push(i);
}

export function Board() {
  const snake = useRef(new Snake());
  const [tick, setTick] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snacko, setSnacko] = useState(new Snacko(MAX_DIM));
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [
    hasDirectionChangedSinceLastMove,
    setHasDirectionChangedSinceLastMove,
  ] = useState(false);
  const [queuedDirection, setQueuedDirection] = useState<Direction>();

  useInterval(() => {
    if (isPlaying && tick % speed === 0) {
      snake.current.move();
      setHasDirectionChangedSinceLastMove(false);

      if (queuedDirection) {
        changeDirection(queuedDirection);
        setQueuedDirection(null);
      }

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

  function restartGame() {
    snake.current = new Snake();
    setIsGameOver(false);
    setScore(0);
  }

  function changeDirection(direction: Direction) {
    if (hasDirectionChangedSinceLastMove) {
      setQueuedDirection(direction);
    } else {
      snake.current.direction = direction;
      setHasDirectionChangedSinceLastMove(true);
    }
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    e.preventDefault();
    switch (e.code) {
      case "ArrowUp":
        changeDirection(Direction.UP);
        break;
      case "ArrowDown":
        changeDirection(Direction.DOWN);
        break;
      case "ArrowLeft":
        changeDirection(Direction.LEFT);
        break;
      case "ArrowRight":
        changeDirection(Direction.RIGHT);
        break;
    }
  }

  return (
    <div>
      <PlayButton
        handleKeyPress={handleKeyPress}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        isGameOver={isGameOver}
        restartGame={restartGame}
      />
      <h1>
        🏆 {score}{" "}
        <span className="game-over">{isGameOver ? "GAME OVER" : ""}</span>
      </h1>
      {/* <SpeedSelector speed={speed} setSpeed={setSpeed} /> */}
      <table>
        <tbody>
          {DIMS.map((y) => (
            <tr key={y}>
              {DIMS.map((x) => (
                <Cell
                  key={x}
                  x={x}
                  y={y}
                  snake={snake.current}
                  snacko={snacko}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
