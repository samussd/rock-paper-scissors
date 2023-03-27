let playerScore = document.querySelector('.game__playerScore');
let computerScore = document.querySelector('.game__computerScore');

let gameLose = new Audio('sounds/game-lose.wav');
let gameWin = new Audio('sounds/game-win.wav');
let gameDraw = new Audio('sounds/game-draw.wav');
let computerSelect = new Audio('sounds/computer-select.wav');
let playerSelect = new Audio('sounds/player-select.wav');

let playingRound = false;
let playingGame = true;
let maxScore = 3;

let muted = false;

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


function playGame() {
    document.querySelectorAll('.game__button').forEach(btn => {
        btn.addEventListener('click', async function gameloop(event) {
            if (playingRound || !playingGame) return;
            playingRound = true;


            //handle game logic
            tryToPlay(playerSelect);
            let item = event.target;
            item.classList.add('-player-selected');
            let playerResult = item.classList[1].slice(0,-4);

            await delay(530);

            tryToPlay(computerSelect);
            let computerResult = getComputerChoice();
            document.querySelector('.'+computerResult+'-btn').classList.add('-computer-selected');

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

            document.querySelector('.'+computerResult+'-btn').classList.remove('-computer-selected');
            item.classList.remove('-player-selected');
            
            await delay(200);

            playingRound = false;

            //check if game is over
            if (+playerScore.textContent >= maxScore || +computerScore.textContent >= maxScore) {
                endGame();
            }
        });
    });
}

async function endGame() {
    let game = document.querySelector('.game');
    let gameOver = document.querySelector('.gameOver');
    let gameWinner = document.querySelector('.game-winner');

    gameWinner.textContent = (+playerScore.textContent > +computerScore.textContent) ? 'player' : 'computer';
    game.style.display = 'none';
    gameOver.style.display = 'flex';

    playingGame = false;


    //listener
    document.querySelectorAll('.gameOver__button').forEach(btn => {
        btn.addEventListener('click', async function round(event) {
            if (playingRound || playingGame) return;

            let item = event.target;

            if (item.classList.contains('bo5-btn')) {
                maxScore = 3;
            } else if (item.classList.contains('infinite-btn')) {
                maxScore = Infinity;
            }

            playingGame = true;
            game.style.display = 'flex';
            gameOver.style.display = 'none';
            playerScore.textContent = '0';
            computerScore.textContent = '0';
        });
    });


}

//sound button
document.querySelector('.header__sound-btn').onclick = function() {
    document.querySelector('.header__sound-btn').classList.toggle('-muted');
    muted = !muted;
}

playGame();


//game();
