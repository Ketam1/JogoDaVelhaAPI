// Importing bussiness logic
const {choosePlayer} = require('./../services/playerChooser.js');
const {createId} = require('./../services/idCreator.js');

function createGame(req, res){

  //Calling methods to retrieve ID and decide the First Player
  const firstPlayer = choosePlayer();
  const gameId = createId();

  if(gameId == "ERROR"){
    res.send({message: 'Error while trying to create game ID'});
    return 0;
  }

  // Creating the object that will be returned;
  const gameData = {
    'id': gameId,
    'firstPlayer': firstPlayer
  }

  // Returning the object
  res.send({message: gameData});
}

module.exports = {
  createGame
}
