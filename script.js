function getComputerChoice() {
    let options = ['rock','paper','scissors'];
    return options[Math.floor(Math.random()*options.length)];
}

function playRound(playerSel, computerSel) {
    let result;
    console.log(playerSel, computerSel);
    if (playerSel === computerSel) result = 'draw';
    else if (
        playerSel==='rock' && computerSel==='paper'
        || playerSel==='paper' && computerSel==='scissors'
        || playerSel==='scissors' && computerSel==='rock'
        ) result = 'computer';
    else result = 'player';

    switch (result) {
        case 'draw':
            return 'The game is a draw.';

        case 'computer':
            return `You lose. ${computerSel} beats ${playerSel}.`;

        case 'player':
            return `You win! ${playerSel} beats ${computerSel}.`;
        
        default:
            console.error('no winner. invalid result.');
    }
}

let comp;
for (let i=0; i<100; i++){
    console.log(playRound(getComputerChoice(), getComputerChoice()));
}
