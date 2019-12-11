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

  //Get all file names in the directory
  try{
    let files = fs.readdirSync(DATA_PATH);
  } catch(e){
    return "ERROR"
  }

  //Recursively search for certain ID in the files then return
  for (i = 0; files.length < i; i++) {
    content = fs.readFileSync(DATA_PATH + '/' + files[i], 'UTF-8');
    gameJsonArray[i] = JSON.parse(content);
  }
  return "ID was not found";
}


module.exports = {
  readAll,
  read
}
