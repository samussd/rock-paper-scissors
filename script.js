const playerScore = document.querySelector('.game__playerScore');
const computerScore = document.querySelector('.game__computerScore');
const game = document.querySelector('.game');
const gameOver = document.querySelector('.gameOver');
const gameWinner = document.querySelector('.game-winner');

const gameLose = new Audio('sounds/game-lose.wav');
const gameWin = new Audio('sounds/game-win.wav');
const gameDraw = new Audio('sounds/game-draw.wav');
const computerSelect = new Audio('sounds/computer-select.wav');
const playerSelect = new Audio('sounds/player-select.wav');

let playingRound = false;
let playingGame = true;
let muted = false;
let maxScore = 5;


const delay = ms => new Promise(res => setTimeout(res, ms));

const tryToPlay = audio => {if (!muted) audio.play();};

function getComputerChoice() {
    let options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*options.length)];
}

function roundResult(playerSel, computerSel) {
    let plyr = playerSel.toUpperCase();
    let cptr = computerSel.toUpperCase();

    if (!['ROCK', 'PAPER', 'SCISSORS'].includes(plyr)) 
        return console.error('no winner. invalid result.');

    if (plyr === cptr) 
        return 'draw';
    else if (
        plyr==='ROCK' && cptr==='PAPER'
        || plyr==='PAPER' && cptr==='SCISSORS'
        || plyr==='SCISSORS' && cptr==='ROCK'
        ) 
        return 'computer';
    else 
        return 'player';
}

async function gameLoop(e) {
    if (playingRound || !playingGame) return;
    playingRound = true;


    //handle game logic
    tryToPlay(playerSelect);
    let item = e.target;
    item.classList.add('--player-selected');
    let playerResult = item.dataset.element;

    await delay(530);

    tryToPlay(computerSelect);
    let computerResult = getComputerChoice();
    document.querySelector(`div[data-element="${computerResult}"]`).classList.add('--computer-selected');

    await delay(770);

    let result = roundResult(playerResult, computerResult);

    //update score and button styling
    if (result==='player') {
        playerScore.textContent = +playerScore.textContent + 1;
        tryToPlay(gameWin);
    }
    else if (result==='computer') {
        computerScore.textContent = +computerScore.textContent + 1;
        tryToPlay(gameLose);
    }
    else if (result==='draw') {
        tryToPlay(gameDraw);
    }

    document.querySelector(`div[data-element="${computerResult}"]`).classList.remove('--computer-selected');
    item.classList.remove('--player-selected');
    
    await delay(200);

    playingRound = false;

    //check if game is over
    if (+playerScore.textContent >= maxScore || +computerScore.textContent >= maxScore) {
        endGame();
    }
}

async function restartGame(e) {
    if (playingRound || playingGame) return;

    let item = e.target;

    if (item.classList.contains('bo5-btn')) {
        maxScore = 5;
    } else if (item.classList.contains('infinite-btn')) {
        maxScore = Infinity;
    }

    playingGame = true;
    game.style.display = 'flex';
    gameOver.style.display = 'none';
    playerScore.textContent = '0';
    computerScore.textContent = '0';
}

async function endGame() {
    gameWinner.textContent = (+playerScore.textContent > +computerScore.textContent) ? 'player' : 'computer';
    game.style.display = 'none';
    gameOver.style.display = 'flex';

    playingGame = false;
}

//sound button
document.querySelector('.header__sound-btn').onclick = function() {
    document.querySelector('.header__sound-btn').classList.toggle('-muted');
    muted = !muted;
}

//listeners
document.querySelectorAll('.game__button').forEach(btn => {
    btn.addEventListener('click', e => gameLoop(e));
});

document.querySelectorAll('.gameOver__button').forEach(btn => {
    btn.addEventListener('click', e => restartGame(e));
});

