let words = ['pirate', 'mangue', 'maison', 'puree', 'chocolat', 'hyperventilation', 'riviere', 'tapis magique'];

function randomWord() {
    let index = Math.round(Math.random() * (words.length - 1));
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
  console.log(newStr);
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

let err;
let maxErr = 3;
while (true) {

  let word = randomWord();

  // let word = words[7];
  // console.log(word);

  let toFill = initFillStr(word.length, word);

  console.log(toFill);
  console.log(word.length);

  err = 0;
  while (true){

    if (toFill === word) {
      console.log('COMPLETE');
      break;
    }
    // console.log(letter.length);<
    let letter = prompt('What is your guess ?', '');

    if (letter == '') {
      console.log('PLEASE WRITE SOMETHING');
    }

    else {
      if (word.indexOf(letter) !== -1) {
        console.log('OK');
        toFill = fillWord(toFill, letter, word);
      }
      else {
        err++;
        console.log('WRONG');
      }
      if (err == maxErr) {
        console.log('YOU LOST');
        break ;
      }
    }

    if (err == maxErr) {
      break;
    }
  }

  let retry = prompt("Do you want to try again ? yes/no").toLowerCase();
  if (retry == 'no') {
    console.log('BYE BYE');
    break;
  }
}
