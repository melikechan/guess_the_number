'use strict';

// TODO: Refactor the code to improve readability.

// Buttons
const guessButton = document.getElementById('submitButton');
const restartButton = document.getElementById('restartButton');

// Inputs
const guessInput = document.getElementById('guessInput');

// Fields (no user interaction particularly)
const guessContent = document.getElementById('guessContent');
const guessStatus = document.getElementById('guessStatus');
const scoreField = document.getElementById('score');
const highScoreField = document.getElementById('highScore');
const restartField = document.getElementById('restart');

let score = 20;
let highScore = 0;

let guess = 0;
let randomNum = Math.floor(Math.random() * 100) + 1;

const initContent = () => {
  scoreField.textContent = `Score: ${score}`;
  highScoreField.textContent = `High score: ${highScore}`;
  restartField.style.display = 'none';
};

const checkGuess = () => {
  if (guess < 1 || guess > 100) {
    guessStatus.textContent = 'Your input is too small or large!';
    return;
  }

  if (guess > randomNum) {
    guessStatus.textContent =
    'The number you guessed is higher than the actual one!';
    score--;
    scoreField.textContent = `Score: ${score}`;
    guessContent.textContent = guess;
  } else if (guess < randomNum) {
    guessStatus.textContent =
    'The number you guessed is lower than the actual one!';
    score--;
    scoreField.textContent = `Score: ${score}`;
    guessContent.textContent = guess;
  } else {
    guessStatus.textContent = 'You won!';
    guessContent.textContent = guess;
    guessButton.disabled = true;
    scoreField.textContent = `Score: ${score}`;
    restartField.style.display = 'initial';
    if (score > highScore) {
      highScore = score;
      highScoreField.textContent = `High score: ${highScore}`;
    }
  }
};

const checkGameEnd = () => {
  if (score === 0) {
    guessStatus.textContent = 'You are out of score!';
    restartField.style.display = 'initial';
    guessButton.disabled = true;
  }
};

const makeGuess = () => {
  if (guessInput.value === '') {
    guessStatus.textContent = 'Please enter a valid input!';
  } else {
    guess = parseInt(guessInput.value);
    checkGuess(guess);
    checkGameEnd(score);
  }
};

const restartGame = () => {
  score = 20;
  randomNum = Math.floor(Math.random() * 100) + 1;
  scoreField.textContent = `Score: ${score}`;
  highScoreField.textContent = `High score: ${highScore}`;
  guessContent.textContent = 'Start!';
  guessStatus.textContent = 'Your guess is...';
  restartField.style.display = 'none';
  guessButton.disabled = false;
};

window.addEventListener('load', initContent);
guessButton.addEventListener('click', makeGuess);
restartButton.addEventListener('click', restartGame);
