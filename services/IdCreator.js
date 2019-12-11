const reader = require('./../helpers/fileReader.js');


// Get last game id and increases it by 1, getting a new id
function createId(){
  let gameJsonArray = reader.readAll();
  if(gameJsonArray != "ERROR"){
    let lastArrayElement = gameJsonArray.length - 1;
    let newId = gameJsonArray[lastArrayElement].game.gameId + 1;
    console.log(newId);
    return newId;
  }
  else{
    return "ERROR";
  }

}

module.exports = {
  createId
}
