'use strict';

const fs = require('fs');
const path = require('path');
const readCsv = require('../../../../../src/renderer-process/functions/read-csv');

describe('Testing readCsv', () => {
  describe('When csv is valid', () => {
    test('Should return data', async () => {
      const filePath = path.resolve(__dirname, '../../../../test-data/valid.csv');
      const readStream = fs.createReadStream(filePath);
      const result = await readCsv(readStream, { headers: true });
      expect(result).toStrictEqual({
        data: [
          { id: '1', topic: 'JavaScript' },
          { id: '2', topic: 'Node' }
        ],
        rowCount: 2
      });
    });
  });

  describe('When csv is invalid', () => {
    test('Should throw error', async () => {
      const filePath = path.resolve(__dirname, '../../../../test-data/invalid.csv');
      const readStream = fs.createReadStream(filePath);
      try {
        await readCsv(readStream, { headers: true });
        throw new Error('Should have failed!');
      } catch (e) {
        expect(e.message).toBe("Parse Error: missing closing: '\"' in line: at '\",HAHAHA'");
      }
    });
  });
});
