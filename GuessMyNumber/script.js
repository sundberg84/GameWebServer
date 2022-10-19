'use strict';

//Generate random number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  //Fetch number/value from .guess
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    //No number input from user
    document.querySelector('.message').textContent = 'No number!';
  } else if (guess > secretNumber) {
    // To high guess
    if (score > 1) {
      document.querySelector('.message').textContent = 'To high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lost :(';
      score = 0;
      document.querySelector('.score').textContent = score;
    }
  } else if (guess < secretNumber) {
    //TO low guess
    if (score > 1) {
      document.querySelector('.message').textContent = 'To Low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = 'You lost :(';
      score = 0;
      document.querySelector('.score').textContent = score;
    }
  } else if (guess === secretNumber) {
    //Correct guess- winner!
    document.querySelector('.message').textContent = 'Winner!!';
    document.querySelector('.number').textContent = secretNumber; //debug
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (highscore < score) {
      highscore = score;
      const name = prompt(
        'You WON! - Please enter the WINNERS name',
        'Harry Potter'
      );
      document.querySelector('.highscore').textContent = `${score} (${name})`;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  // Reset game
  score = 20;
  document.querySelector('.message').textContent = 'Start guessing, again...';
  document.querySelector('.number').textContent = '?'; //debug
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
