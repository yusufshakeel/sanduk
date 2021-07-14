'use strict';
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

function FileHandler() {
  this.readFile = async ({ filePath }) => {
    await readFile(filePath, 'utf8');
  };

  this.writeFile = async ({ filePath, data }) => {
    await writeFile(filePath, data);
  };
}

module.exports = FileHandler;
