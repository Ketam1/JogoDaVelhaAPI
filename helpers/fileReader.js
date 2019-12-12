const fs = require('fs');
const DATA_PATH = 'data';


// Read all files and returns a array of all the content, with index being the
// content of one file
function readAll(){

  let gameJsonArray = [];
  let files = [];

  //Get all filenames in the directory
  try{
    files = fs.readdirSync(DATA_PATH);
  } catch(e){
    return "ERROR"
  }

  //Recursively adds the content of files in to an array
  for (let i = 0; i < files.length; i++) {
    try{
      content = fs.readFileSync(DATA_PATH + '/' + files[i], 'UTF-8');
      gameJsonArray.push(JSON.parse(content));
    } catch(e){
      return "ERROR"
    }
  }

  return gameJsonArray;
}

// Read a specific file and return it's contents
function read(id){
  let gameJson;
  let files = [];

  //Get all file names in the directory
  try{
    files = fs.readdirSync(DATA_PATH);
  } catch(e){
    return "ERROR"
  }

  //Recursively search for certain ID in the files then return
  for (let i = 0; i < files.length; i++) {
    content = fs.readFileSync(DATA_PATH + '/' + files[i], 'UTF-8');
    gameJson = JSON.parse(content);
    if(gameJson.game.gameId == id){
      return gameJson;
    }
  }
  return "ID_NOT_FOUND";
}


module.exports = {
  readAll,
  read
}
