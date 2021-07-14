'use strict';
const FileHandler = require('../../../../src/handlers/file-handler');
const fileHandler = new FileHandler();

describe('Testing readFile', () => {
  test('Should be able to read file', async () => {
    await expect(
      fileHandler.readFile({ filePath: __dirname + '/../../../stubs/sample.txt' })
    ).resolves.not.toThrow();
  });

  test('Should throw error', async () => {
    try {
      await fileHandler.readFile({ filePath: __dirname + '/../../../stubs/unknown.json' });
      throw new Error('Should have failed!');
    } catch (e) {
      expect(e.message).toStrictEqual(
        `ENOENT: no such file or directory, open '${__dirname}/../../../stubs/unknown.json'`
      );
    }
  });
});

describe('Testing writeFile', () => {
  test('Should be able to write file', async () => {
    await expect(
      fileHandler.writeFile({
        filePath: __dirname + '/../../../../output/sample.txt',
        data: 'Hello World!'
      })
    ).resolves.not.toThrow();
  });

  test('Should throw error', async () => {
    try {
      await fileHandler.writeFile({ filePath: __dirname + '/../../../stubs/unknown.txt' });
      throw new Error('Should have failed!');
    } catch (e) {
      expect(e.message).toStrictEqual(
        `The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received undefined`
      );
    }
  });
});
