//Winning Combinations
const winningCombos=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

//HELPER FUNCTIONS
//Return all the q elements in an Array Format
const grid = () => Array.from(document.getElementsByClassName('q'));

//Remove 'q' from the id element so that it returns only the natural number so that we
//can access the Array with it
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q',''));

// A function to check which are the quadrants that are empty without an 'X' and 'O'
const emptyQs=() => grid().filter(_qEl => _qEl.innerText==='');

//A function that determines if we have a match with all three elements the same as the
//'X' or 'O' of the first element in the array
const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !=='')

//The takeTurn Function
const takeTurn = (index,letter) => grid()[index].innerText = letter;

//Opponent's choice - How to find out which quadrant is the Opponent's choice
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random()* emptyQs().length)]);

//How to know the game is ended
const endGame = (winningSequence) => {
    winningSequence.forEach(_qEl => _qEl.classList.add("winner"));
    disableListeners();
};

//Function that checks for Victory
const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(_c => {
        const _grid = grid();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if (allSame(sequence)){
            victory = true;
            endGame(sequence);
        }
    });
    return victory;
};

//Opponent's Turn
const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'o');
        if (!checkForVictory())
            enableListeners();
    },1000);
}

//The clickFn
const clickFn = (event) => {
    takeTurn(qNumId(event.target),'x');
    if (!checkForVictory())
        opponentTurn();
}

//Add Event Listeners for each of the quadrants
const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click',clickFn));
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click',clickFn));

enableListeners();