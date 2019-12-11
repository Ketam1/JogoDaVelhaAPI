const fs = require('fs');
const util = require('util');

const DATA_PATH = 'data';

// Turns fs.writeFile into a promise for asynchronous use
const write = util.promisify(fs.writeFile);

async function writeNew(data, filename){
  try{
    await write(DATA_PATH + '/' + filename, data);
  }
  catch(e){
    return "ERROR"
  }
}

module.exports = {
  writeNew
}
