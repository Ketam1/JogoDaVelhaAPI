
function choosePlayer(){
  // Math.random gives a number between 0 and 1
  // If less than 0,5 returns TRUE, else returns FALSE
  let bool = Math.random() < 0.5;
  let player = '';

  // Converting TRUE/FALSE into X/O
  if(bool)
    player = 'X'
  else
    player = 'O'

  return player;
}

module.exports = {
  choosePlayer
}
