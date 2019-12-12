// Importing bussiness logic
const fileHandler = require('./../services/fileHandler.js');
const {validateMove} = require('./../services/moveValidator.js');

const WRONG_ROUND = "WRONG_ROUND";
const WRONG_ID = "WRONG_ID";
const WRONG_POS = "WRONG_POS";
const VALID = "VALID";
const WINNER = "WINNER";
const DRAW = "DRAW";
const END = "END";

function makeMove(req, res){

  req = req.body;

  // Getting the request data and saving in a variable
  let moveData = {
    id: req.id,
    player: req.player,
    movement: {
      x: req.position.x,
      y: req.position.y
    }
  }

  let winnerStatus = {
    gameState: "Finished",
    player: req.player,
  }

  let drawStatus = {
    gameState: "Finished",
    player: "Draw",
  }

  let continueStatus = {
    gameState: "Ongoing",
    player: "#",
  }

  status = validateMove(moveData);



  // Making the file changes then returning the message based on validation;
  switch (status) {
    case WRONG_ROUND:
      res.send({msg: 'Não é o turno do jogador'});
    break;
    case WRONG_ID:
      res.send({msg: 'Partida inexistente'});
    break;
    case WRONG_POS:
      res.send({msg: 'A posição já está ocupada ou não é válida'});
    break;
    case VALID:
      fileHandler.addMovementFile(moveData, continueStatus);
      res.send(200);
    break;
    case WINNER:
      fileHandler.addMovementFile(moveData, winnerStatus);
      res.send({
        status: "Partida finalizada",
        winner: req.player
      });
    break;
    case DRAW:
      fileHandler.addMovementFile(moveData, drawStatus);
      res.send({
        status: "Partida finalizada",
        winner: "Draw"
      });
    break;
    case END:
      res.send({msg: 'O Jogo ja foi finalizado'})
    break;
    default:
      res.send({msg: 'Error while trying to define if the move is valid'})
  }
}


module.exports = {
  makeMove
}
