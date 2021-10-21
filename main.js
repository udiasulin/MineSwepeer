const MINE = '💣'
const EMPTY = ' '
const MARK = '🚩'

let gBoard;

let gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0

}

let gLevel = {
    size: 4,
    mines: 3
};

function init() {
    console.log('Hello');
    gBoard = buildBoard()
    renderBoard(gBoard)
    console.log(gBoard);

}
function buildBoard() {
    var board = []
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }


        }
    }
    setRandomMines()
    setMinesNegsCount(board)
    return board;
}

function renderBoard(board) {
    console.log(board);
    var cellClass;
    setRandomMines(gLevel.mines,gBoard,cellClass)
    var strHtml = '<table><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            cellClass = getClassName({ i: i, j: j })
            // setRandomMines(gLevel.mines,gBoard,cellClass)
            if (board[i][j].isMine === false) {
                strHtml += `<td class="cell ${cellClass}" onClick ="cellClicked(this,${i},${j})">${EMPTY}</td>`;

            } else {
                strHtml += `<td class="cell ${cellClass}" onClick ="cellClicked(this,${i},${j})">${MINE}</td>`
            }

        }
        strHtml += '</tr>'
    }
    strHtml += '</tbody></table>'
    var elTbody = document.querySelector('.board-container')
    console.log(strHtml);
    console.log(elTbody);
    elTbody.innerHTML = strHtml
}




function cellClicked(elCell, i, j) {
    console.log(elCell);
    elCell.innerText = gBoard[i][j].minesAroundCount.value++

    if (elCell === EMPTY) {
        elCell.isShown = true;

    }

   


}

function difficulty(elBtn) {
    if (elBtn.innerText === 'Easy') {
        gLevel.size = 4
        gLevel.mines = 3
    }
    if (elBtn.innerText === 'Medium') {
        gLevel.size = 6
        gLevel.mines = 6
    }
    if (elBtn.innerText === 'Hard') {
        gLevel.size = 8
        gLevel.mines = 12
    }
    init()
}



function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    console.log(cellClass ,'Cellclas');
    return cellClass;
}
getCellCoord()
function getCellCoord(strCellClasss) {
    var parts = strCellClasss.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    console.log('coord');
    return coord;
}
function setMinesNegsCount(board) {

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {

            board[i][j].minesAroundCount = countNegs(i, j, board)
        }
    }
    // console.log(board);
    return board;
}

function setRandomMines(minesNum,board,currCell){
	console.log(gLevel.mines);
    for (var i = 0; i < minesNum; i++) {
        var randomI = getRandomIntInclusive(0, board.length - 1)
        var randomJ = getRandomIntInclusive(0, board.length - 1)
        if (board[randomI][randomJ] === currCell) {
            // i--
            continue
        }
        else board[randomI][randomJ].isMine = true
    }
    
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

function countNegs(cellI, cellJ, board) {
    let negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (let j = cellJ - 1; j <= cellJ + 1; j++) {

            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            if (board[i][j].isMine === true) negsCount++;
        }
    }
    console.log(negsCount);
    negsCount
    return negsCount;
}