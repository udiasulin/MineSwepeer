
//creating mat
function createMat(ROWS, COLS) {
    let mat = []
    for (let i = 0; i < ROWS; i++) {
        let row = []
        for (let j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat;
}

console.log(createMat(4,4));

// Render mat to the site

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}