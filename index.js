// Importing libraries
const express = require('express');

// Importing controllers
const controllers = require('./controllers');


const app = express();

// First route
app.post('/game', (req, res) => {
  controllers.createGame(req, res);
})

app.post('/game/*/movement', (req, res) => {
  controllers.makeMove(req, res);
})

// Starting server
app.listen('1337');
