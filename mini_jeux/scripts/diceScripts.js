const diceImgUrl = [
    'blank',
    '../ressources/one_dot.svg',
    '../ressources/two_dot.svg',
    '../ressources/three_dot.svg',
    '../ressources/four_dot.svg',
    '../ressources/five_dot.svg',
    '../ressources/six_dot.svg'
];

var playerName = [];
var getName = [document.getElementsByClassName('inputPlayerName')[0], document.getElementsByClassName('inputPlayerName')[1]];
var displayName = [document.getElementsByClassName('playerNameDisplay')[0], document.getElementsByClassName('playerNameDisplay')[1]];
var formName = document.getElementsByClassName('formPlayerName')[0];

var showWhoStart = [document.getElementsByClassName('playerStart')[0], document.getElementsByClassName('playerStart')[1]];

var globalScores, player, roundScores;

// GET THE SCOREBOARD PLACE AND DISPLAY THE SCORE
var getRoundScoreBoard = [document.getElementById('displayRoundOneTxt'), document.getElementById('displayRoundTwoTxt')];
var getGlobalScoreBoard = [document.getElementById('displayGlobalOneTxt'), document.getElementById('displayGlobalTwoTxt')]

// GET THE BUTTON
var buttonRoll = [document.getElementById('rollDiceOne'), document.getElementById('rollDiceTwo')];
var buttonHold = [document.getElementById('holdButtonOne'), document.getElementById('holdButtonTwo')];

// SCREEN DISPLAY DICE IMAGE
var screendisplay = [document.getElementById('diceImgOne'), document.getElementById('diceImgTwo')];

// VAR TO CHECK IF PLAYER ALREADY PLAYED
var playerOneStart = 0;
var playerTwoStart = 0;

// RESTART THE GAME
const newGameButton = document.getElementById('newGame');

// SET THE DISABLE PART OF THE SCREEN
var getOverlay = [document.getElementsByClassName('overlay')[0], document.getElementsByClassName('overlay')[1]];

var getBackgroundWinner = [document.getElementById('playerOne'), document.getElementById('playerTwo')];

newGameButton.onclick = () => {newGame();}

// ROLL A DICE BETWEEN 1 TO 6
function rollADice() {
    return (Math.ceil(Math.random() * 6));
}

function getPlayerName() {
    let nameInputOne = document.getElementById('playerOneName').value;
    let nameInputTwo = document.getElementById('playerTwoName').value;
    if (nameInputOne.length > 1){
        playerName[0] = nameInputOne;
    }
    if (nameInputTwo.length > 1){
        playerName[1] = nameInputTwo;
    }
    displayName[0].innerText = playerName[0];
    displayName[1].innerText = playerName[1];
    formName.style.display = 'none';
}

// INITIALISE THE GAME TO ZERO
function newGame() {

    globalScores = [99, 99];
    startGame = [0, 0];
    roundScores = 0;
    player = 2;
    switchPlayer();

    formName.style.display = 'flex';
    playerName = ['Player 1', 'Player 2'];
    displayName[0].innerText = playerName[0];
    displayName[1].innerText = playerName[1];

    playerOneStart = 0;
    playerTwoStart = 0;
    
    getRoundScoreBoard[0].innerText = 0;
    getGlobalScoreBoard[0].innerText = 0;

    getGlobalScoreBoard[1].innerText = 0;
    getRoundScoreBoard[1].innerText = 0;

    getName[0].value = '';
    getName[1].value = '';

    getBackgroundWinner[0].style.background = '';
    getBackgroundWinner[1].style.background = '';
}

// SERVE AS A DELAY
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// SHOW THE DICE IMAGE
async function randomDiceImg(dice) {
    return new Promise(async (resolve) => {
      let showDiceImg = document.createElement('img');
      showDiceImg.classList.add('showDiceImg');
      screendisplay[player].appendChild(showDiceImg);
  
      buttonRoll[player].style.setProperty('pointer-events', 'none');
      buttonHold[player].style.setProperty('pointer-events', 'none');
  
      for (let i = 0; i < 10; i++) {
        showDiceImg.src = diceImgUrl[rollADice()];
        await sleep(100);
      }
      showDiceImg.src = diceImgUrl[dice];
  
      await sleep(200);
      screendisplay[player].removeChild(showDiceImg);
  
      buttonRoll[player].style.setProperty('pointer-events', 'auto');
      buttonHold[player].style.setProperty('pointer-events', 'auto');
  
      resolve();
    });
}

// MAIN PART TO PLAY THE GAME
async function playTheGame(currPlay) {
    let dice = 0;
    
    for (let i = 0; i < 10 ; i++) {
        dice = rollADice();
    }

    await randomDiceImg(dice);
    if (dice === 1) {
        roundScores = 0;
        player = player === 1 ? 0 : 1;
        switchPlayer();
    }
    else {
        roundScores += dice;
        getRoundScoreBoard[player].innerText= roundScores;
    }
}

function winner(currPlay) {
    let looser = currPlay === 0 ? 1: 0;
    deactivateButton(looser);


    buttonRoll[currPlay].style.setProperty('pointer-events', 'none');
    buttonHold[currPlay].style.setProperty('pointer-events', 'none');

    getBackgroundWinner[currPlay].style.background = 'url(' + 'https://cdn.shopify.com/s/files/1/1061/1924/products/4_1024x1024.png?v=1571606116' + ')';
    getBackgroundWinner[currPlay].style.objectFit = 'cover';
    getBackgroundWinner[currPlay].style.backgroundPosition = 'center';
    getBackgroundWinner[currPlay].style.backgroundRepeat = 'no-repeat';
    displayName[looser].innerText = playerName[looser] = ' YOU LOST';
    displayName[currPlay].innerText = playerName[currPlay] + ' WINNER !!!';
}

// HOLD BUTTON FUNCTION
function putHold() {

    globalScores[player] += roundScores;

    getGlobalScoreBoard[player].innerText = globalScores[player];

    if (globalScores[0]>= 100) {
        winner(0)
    }
    else if (globalScores[1] >= 100) {
        winner(1);
    }
    else {
        if (player === 0) {
            getGlobalScoreBoard[1].innerText = globalScores[1];
        }
        else if (player === 1) {
            getGlobalScoreBoard[0].innerText = globalScores[0];
        }
        roundScores = 0;
        player = player === 0 ? 1 : 0;
        switchPlayer();
    }
   
}

// CHECK WHO IS STARTING
async function choosePlayer(currPlay) {
    if (currPlay === 1) {
        playerTwoStart = rollADice();
        showWhoStart[currPlay].innerText = playerTwoStart;
    }
    else if (currPlay === 0) {
        playerOneStart = rollADice();
        showWhoStart[currPlay].innerText = playerOneStart;

    }
    console.log(playerOneStart + ' ' + playerTwoStart);
    if ((playerOneStart !== 0) && (playerTwoStart !== 0)) {
        player = playerOneStart > playerTwoStart ? 0 : 1;
        await sleep(1000);
        showWhoStart[0].innerText = '';
        showWhoStart[1].innerText = '';
    }
    
}

// DEACTIVATE ONE PART OF THE SCREEN
function deactivateButton(currPlayer) {
    getOverlay[currPlayer].style.display = 'block';
    buttonRoll[currPlayer].style.setProperty('pointer-events', 'none');
    buttonHold[currPlayer].style.setProperty('pointer-events', 'none');
    getRoundScoreBoard.innerText = 0;
}

// ACTIVATE ONE PART OF THE SCREEN
function activateButton(currPlayer) {
    getOverlay[currPlayer].style.display = 'none';
    buttonRoll[currPlayer].style.setProperty('pointer-events', 'auto');
    buttonHold[currPlayer].style.setProperty('pointer-events', 'auto');
}

// WHEN LOOSING CONDITION CHANGE TO THE PLAYER
function switchPlayer() {

    roundScores = 0;
    getRoundScoreBoard[0].innerText = 0;
    getRoundScoreBoard[1].innerText = 0;
    if (player === 0) {
        deactivateButton(1);
        activateButton(0);
    }
    else if (player === 1) {
        deactivateButton(0);
        activateButton(1);
    }
    else {
        activateButton(0);
        activateButton(1);
    }
}

// EVENT HANDLER
buttonHold[1].onclick = () => {
    if (startGame[1] === 1){
        putHold();
        roundScores = 0;
    }
}

buttonHold[0].onclick = () => {
    if (startGame[0] === 1){
        putHold();
        roundScores = 0;
    }
}

buttonRoll[1].onclick = () => {
    if (startGame[1] === 0){
        choosePlayer(1);
        startGame[1] = 1;
        switchPlayer();
    }
    else {
        playTheGame();
    }
}

buttonRoll[0].onclick = () => {
    if (startGame[0] === 0){
        choosePlayer(0);
        startGame[0] = 1;
        switchPlayer();
    }
    else {
        playTheGame();
    }
}

window.onload = () => {
    newGame();
}


promises().then()