import React, { useState, useEffect, useCallback } from 'react';
import './retroSnake.css';

const RetroSnake = () => {
    const gridSize = 20;
    const cellSize = 20;

    const [snake, setSnake] = useState<number[][]>([[10, 10]]);
    const [food, setFood] = useState<number[]>([15, 15]);
    const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const generateFood = useCallback(() => {
        const newFood = [
            Math.floor(Math.random() * gridSize),
            Math.floor(Math.random() * gridSize)
        ];
        setFood(newFood);
    }, []);

    const moveSnake = useCallback(() => {
        if (gameOver || !gameStarted) return;

        setSnake(prevSnake => {
            const newSnake = [...prevSnake];
            const head = [...newSnake[0]];

            switch (direction) {
                case 'UP': head[1] -= 1; break;
                case 'DOWN': head[1] += 1; break;
                case 'LEFT': head[0] -= 1; break;
                case 'RIGHT': head[0] += 1; break;
            }

            if (head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize) {
                setGameOver(true);
                return prevSnake;
            }

            if (newSnake.some(seg => seg[0] === head[0] && seg[1] === head[1])) {
                setGameOver(true);
                return prevSnake;
            }

            newSnake.unshift(head);

            if (head[0] === food[0] && head[1] === food[1]) {
                setScore(s => s + 10);
                generateFood();
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, gameStarted, generateFood]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (!gameStarted && e.key === ' ') {
                setGameStarted(true);
                return;
            }

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, gameStarted]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 150);
        return () => clearInterval(interval);
    }, [moveSnake]);

    const resetGame = () => {
        setSnake([[10, 10]]);
        setFood([15, 15]);
        setDirection('RIGHT');
        setGameOver(false);
        setScore(0);
        setGameStarted(false);
    };

    return (
        <div id="retro" className="game-container">

            <div className="game-title">SNAKE</div>

            <div className="score-board">
                <div>SCORE: {score.toString().padStart(4, '0')}</div>
                <div>HIGH: 9999</div>
            </div>

            <div className="game-board">
                {Array.from({ length: gridSize }).map((_, row) =>
                    Array.from({ length: gridSize }).map((_, col) => (
                        <div
                            key={`${row}-${col}`}
                            className="grid-cell"
                            style={{ left: col * cellSize, top: row * cellSize }}
                        />
                    ))
                )}

                {snake.map((seg, i) => (
                    <div
                        key={i}
                        className={`snake-segment ${i === 0 ? 'snake-head' : 'snake-body'}`}
                        style={{ left: seg[0] * cellSize, top: seg[1] * cellSize }}
                    />
                ))}

                <div
                    className="food"
                    style={{ left: food[0] * cellSize, top: food[1] * cellSize }}
                />

                {!gameStarted && !gameOver && (
                    <div className="overlay">
                        <div className="start-text">PRESS SPACE</div>
                        <div className="instructions">USE ARROWS</div>
                    </div>
                )}

                {gameOver && (
                    <div className="overlay">
                        <div className="game-over-title">GAME OVER</div>
                        <div className="final-score">SCORE: {score}</div>
                        <button onClick={resetGame} className="retry-button">RETRY</button>
                    </div>
                )}
            </div>

            <div className="controls-info">
                ↑ ↓ ← → TO MOVE • SPACE TO START
            </div>

        </div>
    );
};

export default RetroSnake;
