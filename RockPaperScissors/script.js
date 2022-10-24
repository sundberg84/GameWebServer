'use strict';
//https://www.youtube.com/watch?v=1yS-JV4fWqY
//https://www.youtube.com/watch?v=RwFeg0cEZvQ

//1. User trycker på knappen

const userPlaySelection = document.querySelectorAll('[data-selection]');
console.log(userPlaySelection);
console.log("tests");

for (let i = 0; i < userPlaySelection.length; i++)
  userPlaySelection[i].addEventListener('click', function () {
    console.log("Button clicked")
  });



