function getComputerChoice() {
    let options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*options.length)];
}

function playRound(playerSel, computerSel) {
    let result;
    let plyr = playerSel.toUpperCase();
    let cptr = computerSel.toUpperCase();

    if (!['ROCK', 'PAPER', 'SCISSORS'].includes(plyr)) 
        return console.error('no winner. invalid result.');

    if (plyr === cptr) result = 'draw';
    else if (
        plyr==='ROCK' && cptr==='PAPER'
        || plyr==='PAPER' && cptr==='SCISSORS'
        || plyr==='SCISSORS' && cptr==='ROCK'
        ) result = 'computer';
    else result = 'player';

    switch (result) {
        case 'draw':
            return `Draw. ${computerSel} is the same as ${playerSel}.`;

        case 'computer':
            return `You lose. ${computerSel} beats ${playerSel}.`;

        case 'player':
            return `You win! ${playerSel} beats ${computerSel}.`;
        
        default:
            console.error('no winner. invalid result.');
    }
}

function game() {
    for (let i=0; i<5; i++){
        console.log(playRound(prompt('Type your choice. (rock, paper, scissors)'), getComputerChoice()));
    }
}


game();
