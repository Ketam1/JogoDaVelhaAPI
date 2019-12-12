// Importing libraries
const express = require('express');
const bodyParser = require('body-parser');

// Importing controllers
const {createGame} = require('./controllers/gameMaker.js');
const {makeMove} = require('./controllers/moveMaker.js');


const app = express();

//Parsing the body as a JSON
app.use(bodyParser.json())

// First route (Creating a game)
app.post('/game', (req, res) => {
  createGame(req, res);
});

//Second route (Making a move)
app.post('/game/*/movement', (req, res) => {
   makeMove(req, res);
});

// Starting server
app.listen('1337');
