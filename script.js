'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');

let scores, currentScore, playing, playerActive;

function init() {
  scores = [0, 0];
  currentScore = 0;
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  playerActive = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  dice.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
}

init();

const switchplayer = function () {
  currentScore = 0;
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const num = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${num}.png`;

    if (num === 1) {
      switchplayer();
    } else {
      currentScore += num;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      scores[playerActive];

    if (scores[playerActive] >= 100) {
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      dice.classList.add('hidden');
      playing = false;
    } else {
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);
