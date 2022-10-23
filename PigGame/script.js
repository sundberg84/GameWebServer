'use strict';

// Select elements
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let CurrentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

function init () {
//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
playing = true
CurrentScore = 0
document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
activePlayer = 0;
diceElement.classList.add('hidden');
player0El.classList.add("player--active");
player1El.classList.remove("player--active");
currentScore0El.textContent = 0
currentScore1El.textContent = 0
scores = [0,0];
}

function switchPlayer (){
  //Switch player
  CurrentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
  CurrentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active')
}

init();

//Add eventhandler for the button
btnRoll.addEventListener('click', function () {
  if (playing) {
  
  const diceRoll = Math.trunc(Math.random() * 6) + 1;

  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${diceRoll}.png`;

  if (diceRoll !== 1) {
    //Add dice to current score
    CurrentScore += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      CurrentScore;
  } else {
      switchPlayer()
  }
}
});

btnHold.addEventListener('click', function () {
  if (playing) {

  //Add current score to active players score
scores[activePlayer] +=  CurrentScore;
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

//Winner
  if (scores[activePlayer] >= 100) {
    playing = false;  
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    diceElement.classList.add('hidden');


  } else {
    switchPlayer()
  }
  }
});

btnNew.addEventListener('click', init);