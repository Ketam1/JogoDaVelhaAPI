// Importing bussiness logic
const {choosePlayer} = require('./../services/playerChooser.js');
const {createId} = require('./../services/idCreator.js');
const {createNewGameFile} = require('./../services/fileHandler.js');

function createGame(req, res){

  //Calling methods to retrieve ID and decide the First Player
  const firstPlayer = choosePlayer();
  const gameId = createId();

  if(gameId == "ERROR"){
    res.send({msg: 'Error while trying to create game ID'});
    return 0;
  }

  // Creating the object that will be returned;
  const gameData = {
    game: {
      gameId: gameId,
      firstPlayer: firstPlayer,
      gameState: 'Ongoing',
    }
  }

  // Consolidating the data created in a file for future use.
  status = createNewGameFile(gameData);

  // Returning the message.
  if(status != 'ERROR'){
    res.send(gameData);
    return 0;
  }
  else{
    res.send({msg: 'Error while trying to create new file for game'});
    return 0;
  }



}

module.exports = {
  createGame
}
