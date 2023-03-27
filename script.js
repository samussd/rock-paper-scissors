playerScore = document.querySelector('.game__playerScore');
computerScore = document.querySelector('.game__computerScore');

rockBtn = document.querySelector('.rock-btn');
paperBtn = document.querySelector('.paper-btn');
scissorsBtn = document.querySelector('.scissors-btn');
buttons = document.querySelectorAll('.game__button');

const delay = ms => new Promise(res => setTimeout(res, ms));

function getComputerChoice() {
    let options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*options.length)];
}

function roundResult(playerSel, computerSel) {
    let result;
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

function playRound() {
    let playerResult;
    document.querySelectorAll('.game__button').forEach(btn => {
        btn.addEventListener('click', event => {
            let item = event.target;
            item.classList.add('-player-selected');
            playerResult = item.classList[1].slice(0,-4);
        })
    })

    delay(1000);

    let computerResult = getComputerChoice();
    document.querySelector(computerResult+'-btn').classList.add('-computer-selected');

    delay(1000);

    let result = roundResult(playerResult, computerResult);
    if (result==='player') playerScore.innerHTML = +playerScore.innerHTML + 1;
    else if (result==='computer') computerScore.innerHTML = +computerScore.innerHTML + 1;

    console.log(result);
}
playRound();

function game() {
    for (let i=0; i<5; i++){
        console.log(roundResult(prompt('Type your choice. (rock, paper, scissors)'), getComputerChoice()));
    }
}


//game();
