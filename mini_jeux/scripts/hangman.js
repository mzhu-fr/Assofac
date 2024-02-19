
// ALL LEFT TO DO IS FIND HANGMAN PICTURE AND INJECT THAT CODE TO THE HTML
// REPLACE ALL CONSOLE LOG AND TEXT TO HTML INSERT

const words = ['pirate', 'mangue', 'maison', 'puree', 'chocolat', 'hyperventilation', 'riviere', 'tapis magique'];


var err, word, toFill, letter, strErr;


const getButton = document.getElementById('buttonGuess');

const hangedman = [
  '../ressources/hangman0.png',
  '../ressources/hangman1.png',
  '../ressources/hangman2.png',
  '../ressources/hangman3.png',
  '../ressources/hangman4.png',
  '../ressources/hangman5.png',
  '../ressources/hangman6.png',
  '../ressources/hangman7.png',
  '../ressources/hangman8.png',
  '../ressources/hangman9.png'
];

var maxErr = hangedman.length - 1;

function randomWord() {
    let index = Math.floor(Math.random() * words.length);
    return (words[index]);
}

function fillWord(toBeFilled, letter, word) {
  let newStr = '';
  
  for (let i = 0; i < word.length; i++) {
    if (letter == word[i]) {
      newStr += letter;
    }
    else {
      newStr += toBeFilled[i];
    }
  }
  return newStr;
}

function initFillStr(wordSize, word) {
  let str = '';
  for (let i = 0; i < wordSize; i++) {
    if (word[i] == ' ') {
      str += ' ';
    }
    else {
      str += '_';
    }
  }
  return (str);
}

function updateWordText(str) {
  let toInject = '';
  for(let i = 0; i < str.length; i++) {
    toInject += (str[i] + ' ');
  }
  document.getElementById('winLose').innerText = toInject;
}

function winCondition(isWin) {
  if (isWin === 1) {
    document.getElementById('winLose').innerText = "YOU WIN";
  }
  document.getElementById('winLose').innerText = "YOU LOST";
}

function init() {

  err = 0;
  word = randomWord();
  strErr = '';

  toFill = initFillStr(word.length, word);

  updateWordText(toFill);

  document.getElementById('hangmanDraw').src = hangedman[err];
  document.getElementById('contentSize').innerText = 'The word is ' + word.length + ' letters long';
}

function errMsg(message) {
  document.getElementById('winLose').innerText = message;
}

function getWord() {
  document.getElementById('hangmanDraw').src = hangedman[err];
  letter = document.getElementById('getGuess').value;
  if (toFill === word) {
    winCondition(1);
  }
  if (letter == '') {
    errMsg('Please write something');
  }
  else if (letter === word) {
    winCondition(1);
  }
  else {
    checkWord();
  }
  updateWordText(toFill);
}

function checkWord() {
  if (strErr.indexOf(letter) !== -1) {
    err++;
    document.getElementById('letterUsed').innerText = strErr;
    errMsg('Already used');
  }
  else {
    strErr += letter;
  }
  if (word.indexOf(letter) !== -1) {
    toFill = fillWord(toFill, letter, word);
  }
  else {
    err++;
    errMsg('Wrong letter');
  }
  if (err >= maxErr) {
    winCondition(0);
  }
  document.getElementById('hangmanDraw').innerText = hangedman[err];
}



getButton.onclick = () => {
  console.log('click success');
  getWord();
}

window.onload = () => {
  init();
}