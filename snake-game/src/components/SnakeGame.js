import React, { useState, useEffect } from "react";
import "./SnakeGame.css"; // Import the updated CSS

const SnakeGame = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const moveInterval = setInterval(moveSnake, speed);
    document.addEventListener("keydown", changeDirection);
    return () => {
      clearInterval(moveInterval);
      document.removeEventListener("keydown", changeDirection);
    };
  }, [snake, direction]);

  const changeDirection = (e) => {
    const key = e.key;
    if (key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
    if (key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
    if (key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
    if (key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
  };

  const handleButtonClick = (newDirection) => {
    if (newDirection === "UP" && direction !== "DOWN") setDirection("UP");
    if (newDirection === "DOWN" && direction !== "UP") setDirection("DOWN");
    if (newDirection === "LEFT" && direction !== "RIGHT") setDirection("LEFT");
    if (newDirection === "RIGHT" && direction !== "LEFT") setDirection("RIGHT");
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    let head = newSnake[newSnake.length - 1];

    if (direction === "UP") head = [head[0], head[1] - 1];
    if (direction === "DOWN") head = [head[0], head[1] + 1];
    if (direction === "LEFT") head = [head[0] - 1, head[1]];
    if (direction === "RIGHT") head = [head[0] + 1, head[1]];

    newSnake.push(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
    } else {
      newSnake.shift();
    }

    if (checkCollision(head)) {
      setGameOver(true);
      clearInterval();
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (head) => {
    for (let segment of snake) {
      if (segment[0] === head[0] && segment[1] === head[1]) return true;
    }
    if (head[0] < 0 || head[1] < 0 || head[0] >= 20 || head[1] >= 20) return true;
    return false;
  };

  return (
    <div className="game-container">
      {gameOver ? (
        <h1>Game Over!</h1>
      ) : (
        <>
          <div className="grid">
            {Array.from({ length: 20 }).map((_, row) =>
              Array.from({ length: 20 }).map((_, col) => {
                const isSnake = snake.some(([x, y]) => x === col && y === row);
                const isFood = food[0] === col && food[1] === row;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`cell ${isSnake ? "snake" : ""} ${
                      isFood ? "food" : ""
                    }`}
                  ></div>
                );
              })
            )}
          </div>
          <div className="controls">
            <div className="control-row">
              <button
                className="control-button"
                onClick={() => handleButtonClick("UP")}
              >
                UP
              </button>
            </div>
            <div className="control-row">
              <button
                className="control-button"
                onClick={() => handleButtonClick("LEFT")}
              >
                LEFT
              </button>
              <button
                className="control-button"
                onClick={() => handleButtonClick("DOWN")}
              >
                DOWN
              </button>
              <button
                className="control-button"
                onClick={() => handleButtonClick("RIGHT")}
              >
                RIGHT
              </button>
            </div>
          </div>
        </>
      )}
      <footer className="footer">Aryan Gaming</footer>
    </div>
  );
};

export default SnakeGame;
