let matrix = shuffleMatrix();
// let matrix = [
//     ['1','2','3'],
//     ['4','5','6'],
//     ['7','','8']    
// ]

let board = document.querySelector('.board');
let startBtn = document.querySelector('#start');
let firstScreen = document.querySelector('.first-screen');
let startBtnContainer = document.querySelector('.startBtn-container');
let counterElement = document.querySelector('.counter');
let counter = 60;
let playerWin = false;

// Animación de botones
startBtn.addEventListener('mousedown', ()=> {
    startBtn.style.top = '4px';
})

startBtn.addEventListener('mouseup', ()=> {
    startBtn.style.top = '0px';
})


// Presionar el botón y jugar de nuevo
startBtn.addEventListener('click', () => {
    firstScreen.style.display = 'none';
    startBtnContainer.style.display = 'none';
    counterElement.style.display = 'block';
    matrix = shuffleMatrix();
    // matrix = [
    //     ['1','2','3'],
    //     ['4','5','6'],
    //     ['7','','8']    
    // ]
    drawTokens();
    counter = 60;
    playerWin = false;
    startCounter();
    addEventListeners();
})


// Función para dibujar las fichas  
function drawTokens() {
    board.innerHTML = '';
    matrix.forEach(row => row.forEach(element => {
        if (element == "") {
            board.innerHTML += `<div class="empty">${element}</div>`
        } else {
            board.innerHTML += `<div class="token">${element}</div>`
        }
    }))
}

// Función para agregar eventos a cada uno de los elementos
function addEventListeners() {
    let tokens = document.querySelectorAll('.token');
    tokens.forEach(token => token.addEventListener('click', () => {
        let actualPosition = searchPosition(token.innerText);
        let emptyPosition = searchPosition('');
        let movement = canItMove(actualPosition, emptyPosition);

        if (movement !== false) {     
            updateMatrix(token.innerText, actualPosition, emptyPosition);

            let result = compareMatrix();
            if (result === true) {
                playerWin = true;
                startBtnContainer.style.display = 'block';
                startBtn.innerText = 'Jugar de nuevo!';
                confetti({
                    particleCount: 150,
                    spread: 180
                });
            }

            drawTokens();
            addEventListeners();
        }
    }))
}

// Función para verificar la posición de la ficha o elemento para identificar hacia donde se puede mover
function searchPosition(element) {
    let rowIndex = 0;
    let columnIndex = 0;
    matrix.forEach((row, index) => {
        let rowElement = row.findIndex(item => item == element);
        if (rowElement !== -1) {
            rowIndex = index;
            columnIndex = rowElement;
        }
    })
    return [rowIndex, columnIndex];
}

// Función para saber el próximo movimiento
function canItMove(actualPosition, emptyPosition) {
    if (actualPosition[1] == emptyPosition[1]) {
        // Lógica actual optimizada
        if (actualPosition[0]-emptyPosition[0] > 1 || actualPosition[0]-emptyPosition[0] < -1) {
            return false;
        }

        // Lógica anterior
        // if (actualPosition[0]-emptyPosition[0] == -1) {
        //     return 'Down';
        // } else if (actualPosition[0]-emptyPosition[0] == 1) {
        //     return 'Up';
        // } else {
        //     return 'noMove';
        // }
    } else if (actualPosition[0] == emptyPosition[0]) {
        // Lógica actual optimizada
        if (actualPosition[1]-emptyPosition[1] > 1 || actualPosition[1]-emptyPosition[1] < -1) {
            return false;
        }

        // Lógica anterior
        // if (actualPosition[1]-emptyPosition[1] == -1) {
        //     return 'Right';
        // } else if (actualPosition[1]-emptyPosition[1] == 1) {
        //     return 'Left';
        // } else {
        //     return 'noMove';
        // }
    } else {
        return false;
    }
}

// Función para actualizar la matriz
function updateMatrix(element, actualPosition, emptyPosition) {
    matrix[actualPosition[0]][actualPosition[1]] = '';
    matrix[emptyPosition[0]][emptyPosition[1]] = element;
}

// Función para desordenar la matrix
function shuffleMatrix() {
    let shuffleMatrix = [
        [],
        [],
        []
    ]

    let array = ['1', '2', '3', '4', '5', '6', '7', '8', '']
    let shuffleArray = array.sort(() => Math.random()-0.5);

    let column = 0;
    let row = 0;

    shuffleArray.forEach(element => {
        shuffleMatrix[row].push(element)
        if (column < 2) {
            column++ 
        } else {
            column = 0
            row++
        }
    })
    return shuffleMatrix;
    
}

// Función para comparar las matrices y verificar que ya esté ordenada correctamente
function compareMatrix() {
    let counter = 0;
    let finalMatrix = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','']
    ]

    matrix.forEach((row, indexRow) => {
        row.forEach((element, indexColumn) => {
            if(element == finalMatrix[indexRow][indexColumn]) {
                counter++
            }
        })
    })
    if (counter == 9) {
        return true;
    } else {
        return false;
    }
}

// Contador
function startCounter() {
    counterElement.innerText = counter;
    let counterId = setInterval(() => {
        counter--
    
        if (counter <= 0) {
            // Método para detener el contador cuando llegue a cero
            clearInterval(counterId);
            counterElement.style.display = 'none';
            board.innerHTML = '<p class="game-over">Se acabó el tiempo! ☹</p>'
            startBtnContainer.style.display = 'block';
            startBtn.innerText = 'Jugar de nuevo!';
        } else {
            counterElement.innerText = counter;
        }

        if (playerWin == true) {
            clearInterval(counterId);
        }
    }, 1000)
}
