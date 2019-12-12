const reader = require('./../helpers/fileReader.js');

const WRONG_ROUND = "WRONG_ROUND";
const WRONG_ID = "WRONG_ID";
const WRONG_POS = "WRONG_POS";
const VALID = "VALID";
const WINNER = "WINNER";
const DRAW = "DRAW";
const END = "END";

// Check if the column of the last move is completed
function checkCol(board, x, player){
    if(board[x][0] == player && board[x][1] == player && board[x][2] == player)
      return true;
    else
      return false;
}

// Check if the line of the last move is completed
function checkLine(board, y, player){
    if(board[0][y] == player && board[1][y] == player && board[2][y] == player)
      return true;
    else
      return false;
}

// Check if the diagonal of the last move is completed
function checkDiag(board, player){
  if(board[0][0] == player && board[1][1] == player && board[1][1] == player){
    return true;
  }
  if(board[0][2] == player && board[1][1] == player && board[2][0] == player){
    return true;
  }
}

// Check if the position selected is valid
function checkPosition(id, x, y){
  let gameJson = reader.read(id).game;
  let gameMoves = gameJson.movements;
  if(x < 0 && x > 2 && y < 0 && y > 2)
    return WRONG_POS;
  for(let i = 0; i < gameMoves.length; i++){
    if(gameMoves[i].movement.x == x && gameMoves[i].movement.y == y)
      return WRONG_POS;
  }
}

// Check if the game already finished
function checkEnd(id){
  let gameJson = reader.read(id).game;
  if(gameJson.gameState == "Finished")
    return END;
}

// Check if the game ID exists
function checkId(id){
  // Read returns "ID_NOT_FOUND" if after iteration it doesnt find game with
  // specified ID
  let gameJsonArray = reader.read(id);
  if(gameJsonArray == "ID_NOT_FOUND")
    return WRONG_ID;
}

//Check if is the correct round
function checkRound(id, player){
  let gameJson = reader.read(id).game;
  let last_round = gameJson.movements.length - 1;

  //If no move was made, checks to see if the move is from the first player
  if(gameJson.movements.length == 0 && gameJson.firstPlayer == player)
    return VALID;
  if(gameJson.movements.length == 0 && gameJson.firstPlayer != player)
    return WRONG_ROUND;
  if(gameJson.movements[last_round].movement.player == player)
    return WRONG_ROUND;

}

// Check if the game has a winner or is a draw
function checkWin(id, player, x, y){
    let gameJson = reader.read(id).game;
    let winner = '#'
    let virtualBoard = [
      ['#', '#', '#'],
      ['#', '#', '#'],
      ['#', '#', '#']
    ];

    if(gameJson.movements.length == 0){
      return VALID;
    }
    // Populates the virtualBoard with the moves
    for(let i = 0; i < gameJson.movements.length; i++){
      j = gameJson.movements[i].movement.x;
      k = gameJson.movements[i].movement.y;
      virtualBoard[j][k] = gameJson.movements[i].movement.player;
    }
    virtualBoard[x][y] = player;

    if(checkCol(virtualBoard, x, player))
      return WINNER
    if(checkLine(virtualBoard, y, player))
      return WINNER
    if(checkDiag(virtualBoard, player))
      return WINNER

    let round = gameJson.movements.length - 1;
    round = gameJson.movements[round].movement.round;

    if(winner == '#' && round == 8){
      return DRAW;
    }

    return VALID;
}

// Call functions that validate the move.
function validateMove(moveData){
  let move = moveData.movement;

  // Checks conditions before trying to see a winner
  if(checkId(moveData.id) == WRONG_ID)
    return WRONG_ID;
  if(checkEnd(moveData.id) == END)
    return END;
  if(checkRound(moveData.id, moveData.player) == WRONG_ROUND)
    return WRONG_ROUND;
  if(checkPosition(moveData.id, move.x, move.y) == WRONG_POS)
    return WRONG_POS;


  // Check if the games continues or if it has a winner or if it is a draw
  status = checkWin(moveData.id, moveData.player, move.x, move.y);

  return status;
}

module.exports = {
  validateMove
}
