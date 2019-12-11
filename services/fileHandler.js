const writer = require('./../helpers/fileWriter.js');

function createNewGameFile(data){
  let filename = 'game' + data.game.gameId + ".json";
  data = JSON.stringify(data, null, 1);
  status = writer.writeNew(data, filename)
  return status;
}

module.exports = {
  createNewGameFile
}
