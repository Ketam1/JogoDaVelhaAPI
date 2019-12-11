const fs = require('fs');
const DATA_PATH = '../data';

function readAll(){

  let gameJsonArray = [];

  //Get all filenames in the directory

  try{
    let files = fs.readdirSync(DATA_PATH);

  } catch(e){
    console.log(e);
    return "ERROR"
  }


  //Recursively adds the content of files in to an array
  for (i = 0; files.length < i; i++) {
    fs.readFileSync(DATA_PATH + '/' + files[i], function (err, content) {
      if(err)
        return "ERROR"
      else
        gameJsonArray[i] = JSON.parse(content);
    });
  }

  return files[0];
}


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
    fs.readFileSync(DATA_PATH + files[i], function (err, content) {
      gameJson = JSON.parse(content);
      if(err)
        return "ERROR"
      if(gameJson.id = id)
        return gameJson;
    });
  }
  return "ID was not found";
}


module.exports = {
  readAll,
  read
}
