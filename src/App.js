import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';
const App = () => {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random()*10)+1);
  console.log(secretNumber);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const maxCount = 5;
  const [showButton, setShowButton] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    if (count === maxCount) {
      setMessage('You have reached the maximum number of guesses!');
      setShowButton(false);
      setBackgroundColor('red');
    }
  }, [count]);

  useEffect(() => {
    if (gameOver) {
      setBackgroundColor('green');
    }
  }, [gameOver]);

  const remainingAttempts = maxCount - count;

  const handleGuess = (value) => {
    if (!value) {
      setMessage("Please enter a number.");
      return;
    }
    const guessNum = parseInt(value);
    setCount(count + 1);
    if (count < maxCount && !gameOver) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        setGameOver(true);
        setShowButton(false);
      }else if(secretNumber>guessNum) {
        setMessage(`You Guess Too low. Try again!`);
      }
      else if(secretNumber<guessNum) {
        setMessage(`You Guess Too high. Try again!`);
      }
      else{
        setMessage(`Invalid input!!!Try again`)
      }
    }
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 10) + 1);
    setMessage('Game is being restarted');
    setCount(0);
    setGameOver(false);
    
  };

  return (
    <>
    <Header />
    <div style={{ backgroundColor: backgroundColor}}>
    <div className="container">
      <div className="card">
        <div className="content">
          {count < maxCount &&(
            <NumberInput onSubmit={handleGuess} />
          )}
          
          <ResultMessage message={message} />
          {count === maxCount && !gameOver && (
            <Button onClick={resetGame} text="Restart Game" />
          )}
          {gameOver && (
            <Button onClick={resetGame} text="Play Again" />
          )}
        </div>
        <div className="attempts">
          <p>Remaining attempts: {remainingAttempts}</p>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default App;