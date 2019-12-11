const reader = require('./../helpers/fileReader.js');

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
