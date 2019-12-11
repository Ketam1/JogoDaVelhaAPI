// Importing libraries
const express = require('express');

// Importing controllers
const {createGame} = require('./controllers/gameMaker.js');


const app = express();

// First route
app.post('/game', (req, res) => {
  createGame(req, res);
})

// app.post('/game/*/movement', (req, res) => {
//   makeMove(req, res);
// })

// Starting server
app.listen('1337');
