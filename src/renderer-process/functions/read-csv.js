'use strict';

const fastCsv = require('fast-csv');

module.exports = function readCsv(stream, options) {
  return new Promise((resolve, reject) => {
    const data = [];
    fastCsv
      .parseStream(stream, options)
      .on('error', error => reject(error))
      .on('data', row => data.push(row))
      .on('end', rowCount => resolve({ data, rowCount }));
  });
};
