const writer = require('./../helpers/fileWriter.js');
const reader = require('./../helpers/fileReader.js');


//Create new game file and returns the status, saying if any error occurred
function createNewGameFile(data){
  let filename = 'game' + data.game.gameId + ".json";
  data = JSON.stringify(data, null, 4);
  status = writer.writeNew(data, filename)
  return status;
}


function addMovementFile(data, status){
  let filename = 'game' + data.id + ".json";
  let gameJsonFile = reader.read(data.id);
  let lastIndex;
  let nextRound;

  if(gameJsonFile.game.movements.length != 0){
    lastIndex = gameJsonFile.game.movements.length - 1;
    nextRound = gameJsonFile.game.movements[lastIndex].movement.round + 1;
  }
  else{
    nextRound = 1;
  }


  // Transform data to a movement JSON so it can be put in the file.
  let movement = {
    movement: {
      round: nextRound,
      player: data.player,
      x: data.movement.x,
      y: data.movement.y
    }
  }

  // Put move in the JS object then transform into string then write.
  gameJsonFile.game.movements.push(movement);
  gameJsonFile.game.gameState = status.gameState;
  gameJsonFile.game.winner = status.player;
  updatedGameJsonFile = JSON.stringify(gameJsonFile, null, 2);
  status = writer.writeNew(updatedGameJsonFile, filename);
}


module.exports = {
  createNewGameFile,
  addMovementFile
}
