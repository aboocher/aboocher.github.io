document.getElementById('start').addEventListener('click', startGame);

let doesList = [];
let doesNotList = [];
let currentRound = 0;
let howManyForEach = [];
let gameData = {};
let wrongCount = 0;
let currTotal = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

async function loadWords() {
    const doesResponse = await fetch('does.txt');
    const doesText = await doesResponse.text();
    doesList = doesText.split('\n').filter(word => word.trim() !== '');

    const doesNotResponse = await fetch('doesnot.txt');
    const doesNotText = await doesNotResponse.text();
    doesNotList = doesNotText.split('\n').filter(word => word.trim() !== '');

    shuffleArray(doesList);
    shuffleArray(doesNotList);
}

function startGame() {
    const rounds = parseInt(document.getElementById('rounds').value);
    howManyForEach = Array.from({ length: rounds }, () => Math.floor(Math.random() * 4) + 4);
    gameData = { doesListIndex: 0, doesNotListIndex: 0 };
    currentRound = 0;

    // Hide round selection elements
    document.getElementById('start').style.display = 'none';
    document.getElementById('rounds').style.display = 'none';
    document.getElementById('round-label').style.display = 'none';

    loadWords().then(() => nextRound());
}

function updateRoundCounter() {
    const roundCounter = document.getElementById('round-counter');
    roundCounter.textContent = `Round ${currentRound + 1} of ${howManyForEach.length}`;
}

function updateResults() {
    currTotal += 25;
    const results = document.getElementById('result');
    results.textContent = `You missed ${wrongCount} of ${currTotal}`;
}



function nextRound() {

    if (currentRound >= howManyForEach.length) {
        updateRoundCounter();
        return;
    }

    const M = howManyForEach[currentRound];
    const theWords = [
        ...doesList.slice(gameData.doesListIndex, gameData.doesListIndex + M),
        ...doesNotList.slice(gameData.doesNotListIndex, gameData.doesNotListIndex + (25 - M))
    ];
    gameData.doesListIndex += M;
    gameData.doesNotListIndex += (25 - M);

    shuffleArray(theWords);

    updateRoundCounter();
    displayGrid(theWords);

    currentRound++;
}

function displayGrid(words) {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '<p>Click all the words that take an S</p>';

    const grid = document.createElement('table');
    grid.classList.add('word-grid');

    let row;
    words.forEach((word, index) => {
        if (index % 5 === 0) {
            row = document.createElement('tr');
            grid.appendChild(row);
        }
        const cell = document.createElement('td');
        cell.textContent = word;
        cell.classList.add('word-cell');
        cell.addEventListener('click', () => {
            cell.classList.toggle('selected');
        });
        row.appendChild(cell);
    });
    gameDiv.appendChild(grid);

    const checkButton = document.createElement('button');
    checkButton.textContent = 'Check';
    checkButton.addEventListener('click', checkAnswers);
    gameDiv.appendChild(checkButton);
}

function checkAnswers() {
    const cells = document.querySelectorAll('.word-cell');
    cells.forEach(cell => {
        const word = cell.textContent;
        const isHighlighted = cell.classList.contains('selected');

        if (isHighlighted) {
            if (doesList.includes(word)) {
                cell.style.backgroundColor = 'darkgreen';
            } else {
                cell.style.backgroundColor = 'red';
                cell.textContent = word + "\n" + "NO S";
                wrongCount += 1;
            }
        } else {
            if (doesList.includes(word)) {
                cell.style.backgroundColor = 'orange';
                cell.textContent = word + "\n" + "YES S";
                wrongCount += 1;
            } else {
                cell.style.backgroundColor = 'gray';
            }
        }

    });

    const checkButton = document.querySelector('#game button');
    checkButton.textContent = 'Next Round';
    checkButton.removeEventListener('click', checkAnswers);
    checkButton.addEventListener('click', nextRound);

    updateResults();
}
