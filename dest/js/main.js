'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const gBoard = [];
const boardSize = 3;
let blockClick = false;
let gameOver = false;
let gGameCount = 0;
function onInit() {
    createBoard();
    renderBoard();
}
function cellClicked(el, row, column) {
    if (blockClick || gameOver)
        return;
    if (gBoard[row][column].xMarked || gBoard[row][column].oMarked)
        return;
    gGameCount++;
    gBoard[row][column].xMarked = true;
    el.innerText = 'X';
    checkIfGameOVer(row, column);
    blockClick = true;
    setTimeout(() => {
        blockClick = false;
        computerTurn();
    }, 2000);
}
function checkIfGameOVer(row, column) {
    const countingRow = countRow(row);
    const countingColumn = countColumn(column);
    const countingFirstDiagonal = countFirstDiagonal();
    const countingSecondDiagonal = countSecondDiagonal();
    if (countingRow.xCount === boardSize || countingColumn.xCount === boardSize || countingFirstDiagonal.xCount === boardSize || countingSecondDiagonal.xCount === boardSize) {
        gameOver = true;
        console.log('you win!');
    }
    else if (countingRow.oCount === boardSize || countingColumn.oCount === boardSize || countingFirstDiagonal.oCount === boardSize || countingSecondDiagonal.oCount === boardSize) {
        gameOver = true;
        console.log('you lose...');
    }
    else if (gGameCount === 9) {
        gameOver = true;
        console.log('draw.');
    }
}
function countRow(row) {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < gBoard[row].length; i++) {
        if (gBoard[row][i].xMarked)
            xCount++;
        if (gBoard[row][i].oMarked)
            oCount++;
    }
    return { xCount, oCount };
}
function countColumn(column) {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < gBoard.length; i++) {
        if (gBoard[i][column].xMarked)
            xCount++;
        if (gBoard[i][column].oMarked)
            oCount++;
    }
    return { xCount, oCount };
}
function countFirstDiagonal() {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < gBoard.length; i++) {
        if (gBoard[i][i].xMarked)
            xCount++;
        if (gBoard[i][i].oMarked)
            oCount++;
    }
    return { xCount, oCount };
}
function countSecondDiagonal() {
    let xCount = 0;
    let oCount = 0;
    for (let i = 0; i < gBoard.length; i++) {
        if (gBoard[i][gBoard.length - 1 - i].xMarked)
            xCount++;
        if (gBoard[i][gBoard.length - 1 - i].oMarked)
            oCount++;
    }
    return { xCount, oCount };
}
function computerTurn() {
    if (gameOver || gGameCount >= boardSize ** 2)
        return;
    const randomRow = getRandomInt(0, boardSize);
    const randomColumn = getRandomInt(0, boardSize);
    const randomPos = gBoard[randomRow][randomColumn];
    const elRandomPos = document.querySelector(`.pos-${randomRow + '-' + randomColumn}`);
    if (randomPos.xMarked || randomPos.oMarked)
        computerTurn();
    else {
        gGameCount++;
        randomPos.oMarked = true;
        checkIfGameOVer(randomRow, randomColumn);
        elRandomPos.innerText = 'O';
    }
}
function createBoard() {
    for (let i = 0; i < boardSize; i++) {
        gBoard[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const cell = {
                xMarked: false,
                oMarked: false,
            };
            gBoard[i][j] = cell;
        }
    }
}
function renderBoard() {
    let strHTML = '';
    for (let i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class="board-row"> \n`;
        for (let j = 0; j < gBoard.length; j++) {
            strHTML += `\t<td class="pos-${i}-${j}" onclick="cellClicked(this, ${i}, ${j})"> </td>`;
        }
        strHTML += '</tr>\n';
    }
    const elCells = document.getElementById('board');
    elCells.innerHTML = strHTML;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min));
}
