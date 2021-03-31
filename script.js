'use strict';

//DOM
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Internal
let playerTurn = 0;
let totalScore = [0, 0];
let currentScore = 0;
let playing = true;
//Initializing vars
document.querySelector(`#score--${playerTurn}`).textContent = 0;
document.querySelector(`#score--${playerTurn}`).textContent = 0;
diceEl.classList.add('hidden');

//Functions---------------
const loadDiceImage = function (imgPath) {
  diceEl.src = imgPath;
  diceEl.classList.remove('hidden');
};

const rollDice = function () {
  if (playing) {
    console.log('rolling');
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    loadDiceImage(`dice-${diceNumber}.png`);
    setCurrent(diceNumber);
  }
};

const resetCurrent = function () {
  currentScore = 0;
  document.getElementById(`current--${playerTurn}`).textContent = 0;
};

const changeTurn = function () {
  resetCurrent();
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
  playerTurn = playerTurn === 0 ? 1 : 0;
};

const setCurrent = function (number) {
  if (number === 1) {
    changeTurn();
  } else {
    currentScore += number;
    document.getElementById(
      `current--${playerTurn}`
    ).textContent = currentScore;
  }
};

const playerWon = function () {
  document
    .querySelector(`.player--${playerTurn}`)
    .classList.add('player--winner');
  resetCurrent();
  diceEl.classList.add('hidden');
};

const hold = function () {
  if (playing) {
    totalScore[playerTurn] += currentScore;
    document.querySelector(`#score--${playerTurn}`).textContent =
      totalScore[playerTurn];
    currentScore = 0;
    if (totalScore[playerTurn] >= 100) {
      playerWon();
      playing = false;
    } else changeTurn();
  }
};

const reset = function () {
  diceEl.classList.add('hidden');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document
    .querySelector(`.player--${playerTurn}`)
    .classList.remove('player--winner');
  resetCurrent();
  playerTurn = 0;
  totalScore = [0, 0];
  document.querySelector(`#score--0`).textContent = document.querySelector(
    `#score--1`
  ).textContent = 0;
  playing = true;
};

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
btnNew.addEventListener('click', reset);
