class Piece {
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  compare(piece) {
    return piece.row === this.row && piece.column === this.column;
  }
}
const modal = document.getElementById("easyModal");
let game = document.getElementById("game");
let currentPlayer = 1;
let posNewPosition = [];
let capturedPosition = [];

function makeBoard(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board[i] = [];
    for (var j = 0; j < n; j++) {
      board[i][j] = 0;
    }
  }
  return board;
}


let board = makeBoard(10);
board[0][1] = 1;
board[0][0] = 1;
board[1][0] = 1;
builBoard();
