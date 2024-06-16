// script.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('words.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n');
            const selectedLines = [];

            while (selectedLines.length < 48) {
                const randomIndex = Math.floor(Math.random() * lines.length);
                const line = lines.splice(randomIndex, 1)[0];
                selectedLines.push(line);
            }

            const sortedLines = [...selectedLines].sort((a, b) => {
                const [rawWordA] = a.split(',').map(item => item.trim());
                const [rawWordB] = b.split(',').map(item => item.trim());
                const wordA = rawWordA;
                // rawWordA.endsWith('*') ? rawWordA.slice(0, -1) : rawWordA;
                const wordB = rawWordB;
                // rawWordB.endsWith('*') ? rawWordB.slice(0, -1) : rawWordB;
                return wordA.localeCompare(wordB);
            });

            const validDefinitions = selectedLines.filter(line => !line.split(',')[0].endsWith('*'));
            let currentDefinitionIndex = -1;
            const table = document.createElement('table');
            const messageDiv = document.createElement('div');
            const definitionDiv = document.createElement('div');
            const hoorayDiv = document.createElement('div');
            const hintDiv = document.createElement('div');

            hintDiv.innerText = 'HINT';
            // hintDiv.style.position = 'absolute';
            // hintDiv.style.bottom = '10px';
            // hintDiv.style.left = '10px';
            hintDiv.style.fontSize = '1.5em';
            hintDiv.style.padding = '1.5em';
            hintDiv.style.cursor = 'pointer';

            document.body.appendChild(hintDiv);
            document.body.appendChild(messageDiv);
            document.body.appendChild(table);
            document.body.appendChild(definitionDiv);
            document.body.appendChild(hoorayDiv);

            function pickNewDefinition() {
                if (validDefinitions.length === 0) {
                    definitionDiv.innerHTML = '';
                    hoorayDiv.innerText = 'HOORAY!';
                    return;
                }

                currentDefinitionIndex = (currentDefinitionIndex + 1) % validDefinitions.length;
                const [word, newDefinition] = validDefinitions[currentDefinitionIndex].split(',').map(item => item.trim());
                definitionDiv.innerText = `Find the word for: "${newDefinition}"`;
                definitionDiv.dataset.currentDefinition = newDefinition;
                hintDiv.dataset.currentWord = word;
                validDefinitions.splice(currentDefinitionIndex, 1);
                currentDefinitionIndex = -1; // Reset the index after removing the item
            }

            function createTable() {
                table.innerHTML = '';
                messageDiv.innerHTML = '';
                hoorayDiv.innerHTML = '';
                const numCols = Math.min(8, Math.floor(window.innerWidth / 120)); // Max 8 columns
                const numRows = Math.ceil(48 / numCols);

                let row;
                sortedLines.forEach((line, index) => {
                    const [rawWord, definition] = line.split(',').map(item => item.trim());
                    const hasAsterisk = rawWord.endsWith('*');
                    const word = rawWord;
                    // hasAsterisk ? rawWord.slice(0, -1) : rawWord;
                    const bgColor = hasAsterisk ? 'red' : 'blue';

                    if (index % numCols === 0) {
                        row = table.insertRow();
                    }

                    const cell = row.insertCell();
                    cell.innerText = word;
                    cell.title = definition;
                    cell.style.backgroundColor = bgColor;
                    cell.style.color = 'white';
                    cell.style.padding = '10px';
                    cell.style.border = '1px solid white';
                    cell.style.wordWrap = 'break-word';
                    cell.style.cursor = 'pointer';
                    cell.dataset.word = word;
                    cell.dataset.definition = definition;
                    cell.addEventListener('click', function () {
                        const selectedDefinition = definitionDiv.dataset.currentDefinition;
                        if (definition === selectedDefinition) {
                            cell.style.backgroundColor = 'green';
                            pickNewDefinition();
                            messageDiv.innerHTML = '';

                            const allGreen = [...table.getElementsByTagName('td')].every(td => td.style.backgroundColor === 'green' || td.style.backgroundColor === 'red');
                            if (allGreen) {
                                hoorayDiv.innerText = 'HOORAY!';
                                definitionDiv.innerHTML = '';
                            }
                        } else {
                            messageDiv.innerHTML = `Incorrect: ${word} means ${definition}`;
                        }
                    });
                });
            }

            hintDiv.addEventListener('click', function () {
                const currentWord = hintDiv.dataset.currentWord;
                const cells = table.getElementsByTagName('td');
                for (let cell of cells) {
                    if (cell.dataset.word === currentWord) {
                        cell.style.backgroundColor = 'orange';
                        break;
                    }
                }
            });

            createTable();
            pickNewDefinition();
            window.addEventListener('resize', createTable);
        });
});
