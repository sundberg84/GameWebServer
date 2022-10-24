'use strict';
//https://www.youtube.com/watch?v=1yS-JV4fWqY
//https://www.youtube.com/watch?v=RwFeg0cEZvQ

const playData = [
  //This is the data for Rock, Paper, Scissor
  {
    name: 'Rock',
    emoji: '✊',
    beats: 'Scissor',
  },
  {
    name: 'Paper',
    emoji: '✋',
    beats: 'Rock',
  },
  {
    name: 'Scissor',
    emoji: '✌️',
    beats: 'Paper',
  },
];

let userEmoji = document.querySelector('.results-user');
let compEmoji = document.querySelector('.results-comp');
let score = document.querySelectorAll('.result-score');
console.log(score);

let userPlaySelection; //This is what player selected (Rock, Paper, Scissor)

function randomComputerChoise() {
  //2. Make computer random choise.
  const computerPlayIndex = Math.floor(Math.random() * 3);
  return playData[computerPlayIndex];
}

function defineUserWinner(user, computer) {
  return user.beats === computer.name; //user wins if their beats = the computer choise!
}

const userPlayBtn = document.querySelectorAll('[data-selection]'); //This is the button user clicks
//1. User trycker på knappen
for (let i = 0; i < userPlayBtn.length; i++) {
  userPlayBtn[i].addEventListener('click', function () {
    userPlaySelection = userPlayBtn[i].dataset.selection;
    userPlaySelection = playData.find(
      element => element.name === userPlaySelection
    );

    //2. Make computer random choise.
    const computerPlaySelection = randomComputerChoise();
    //console.log(computerPlaySelection);
    console.log();

    //3. Update Emojis to result page
    userEmoji.textContent = userPlaySelection.emoji;
    compEmoji.textContent = computerPlaySelection.emoji;

    //3. Compare between computer and user - who wins?
    if (defineUserWinner(userPlaySelection, computerPlaySelection)) {
      //User wins
      console.log('User wins!');
      score[0].textContent = Number(score[0].textContent) + 1;
      userEmoji.classList.add('winner');
      compEmoji.classList.remove('winner');
    } else if (defineUserWinner(computerPlaySelection, userPlaySelection)) {
      //Computer wins
      console.log('Computer wins!');
      score[1].textContent = Number(score[1].textContent) + 1;
      userEmoji.classList.remove('winner');
      compEmoji.classList.add('winner');
    } else {
      //draw
      console.log('Draw :(');
      userEmoji.classList.remove('winner');
      compEmoji.classList.remove('winner');
    }
  });
}
