'use strict';

//Generate random number
let secretNumber = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highscore = 0;

function userMessage(Message) {
  document.querySelector('.message').textContent = Message;
}
function changeScore(Message) {
  document.querySelector('.score').textContent = Message;
}

document.querySelector('.check').addEventListener('click', function () {
  //Fetch number/value from .guess
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    //No number input from user
    userMessage('No number!');
  } else if (guess !== secretNumber) {
    // To low or high guess
    if (score > 1) {
      userMessage(guess < secretNumber ? 'To low!' : 'To high!');
      score--;
      changeScore(score);
    } else {
      userMessage('You lost! :(');
      score = 0;
      changeScore(score);
    }
  } else if (guess === secretNumber) {
    //Correct guess- winner!
    userMessage('You won!!! :D');
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
  userMessage('Start guessing... again :)');
  document.querySelector('.number').textContent = '?'; //debug
  changeScore(score);
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = '';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
