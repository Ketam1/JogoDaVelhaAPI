const reader = require('./../helpers/fileReader.js');

function createId(){
  let gameJsonArray = reader.readAll();
  if(gameJsonArray != "ERROR"){
    let lastArrayElement = gameJsonArray.length - 1;
    let newId = gameJsonArray[lastArrayElement].id + 1;
    return JSON.stringify(gameJsonArray[0]);
  }
  else{
    return "ERROR";
  }

}

module.exports = {
  createId
}
