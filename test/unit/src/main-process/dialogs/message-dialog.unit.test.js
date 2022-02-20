'use strict';

const messageDialog = require('../../../../../src/main-process/dialogs/message-dialog');

describe('Testing message dialog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const fakeBrowserWindow = { msg: 'fakeBrowserWindow' };
  const fakeElectronDialog = {
    showOpenDialog: jest.fn(async () => ({ filePaths: ['/file/path'] })),
    showSaveDialog: jest.fn(async () => ({ filePath: '/file/path' })),
    showMessageBox: jest.fn(async () => {})
  };

  describe('Testing show open dialog', () => {
    describe('When dialog is canceled', () => {
      test('Should return empty object', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => ({ canceled: true })),
          showSaveDialog: jest.fn(async () => {}),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showOpenDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({});
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });

    describe('When dialog file path is not present', () => {
      test('Should return empty object', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => ({ filePaths: [] })),
          showSaveDialog: jest.fn(async () => {}),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showOpenDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({});
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });

    describe('When dialog returned success', () => {
      test('Should return filePath', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => ({ filePaths: ['/file/path'] })),
          showSaveDialog: jest.fn(async () => {}),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showOpenDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({ filePath: '/file/path' });
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });
  });

  describe('Testing show save dialog', () => {
    describe('When dialog is canceled', () => {
      test('Should return empty object', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => {}),
          showSaveDialog: jest.fn(async () => ({ canceled: true })),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showSaveDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({});
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });

    describe('When dialog file path is not present', () => {
      test('Should return empty object', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => {}),
          showSaveDialog: jest.fn(async () => ({})),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showSaveDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({});
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });

    describe('When dialog returned success', () => {
      test('Should return filePath', async () => {
        const fakeElectronDialog = {
          showOpenDialog: jest.fn(async () => {}),
          showSaveDialog: jest.fn(async () => ({ filePath: '/file/path' })),
          showMessageBox: jest.fn(async () => {})
        };
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        const result = await msgDialog.showSaveDialog({ someOption: 'someValue' });
        expect(result).toStrictEqual({ filePath: '/file/path' });
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { someOption: 'someValue' }
        );
      });
    });
  });

  describe('Testing show error dialog', () => {
    describe('When there is no error message', () => {
      test('Should call with generic error message', async () => {
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        await msgDialog.showErrorDialog({});
        expect(fakeElectronDialog.showMessageBox).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showMessageBox).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { message: 'Some error occurred!', type: 'error' }
        );
      });
    });

    describe('When there is specific error message', () => {
      test('Should call with specific error message', async () => {
        const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
        await msgDialog.showErrorDialog({ message: 'This is specific error message.' });
        expect(fakeElectronDialog.showMessageBox).toHaveBeenCalledTimes(1);
        expect(fakeElectronDialog.showMessageBox).toHaveBeenCalledWith(
          { msg: 'fakeBrowserWindow' },
          { message: 'This is specific error message.', type: 'error' }
        );
      });
    });
  });

  describe('Testing showOpenDialogToSelectJsonFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showOpenDialogToSelectJsonFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        {
          filters: [{ extensions: ['json'], name: 'JSON' }],
          properties: ['openFile', 'openDirectory']
        }
      );
    });
  });

  describe('Testing showSaveDialogToSaveJsonFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showSaveDialogToSaveJsonFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        { filters: [{ extensions: ['json'], name: 'JSON' }], properties: ['openDirectory'] }
      );
    });
  });

  describe('Testing showOpenDialogToSelectXmlFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showOpenDialogToSelectXmlFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        {
          filters: [{ extensions: ['xml'], name: 'XML' }],
          properties: ['openFile', 'openDirectory']
        }
      );
    });
  });

  describe('Testing showSaveDialogToSaveXmlFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showSaveDialogToSaveXmlFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        { filters: [{ extensions: ['xml'], name: 'XML' }], properties: ['openDirectory'] }
      );
    });
  });

  describe('Testing showOpenDialogToSelectFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showOpenDialogToSelectFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        {
          properties: ['openFile', 'openDirectory']
        }
      );
    });
  });

  describe('Testing showSaveDialogToSaveFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showSaveDialogToSaveFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        { properties: ['openDirectory'] }
      );
    });
  });

  describe('Testing showOpenDialogToSelectMarkdownFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showOpenDialogToSelectMarkdownFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showOpenDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        {
          filters: [{ extensions: ['md', 'markdown'], name: 'Markdown' }],
          properties: ['openFile', 'openDirectory']
        }
      );
    });
  });

  describe('Testing showSaveDialogToSaveMarkdownFile', () => {
    test('Should be able to open dialog', async () => {
      const msgDialog = messageDialog(fakeBrowserWindow, fakeElectronDialog);
      const result = await msgDialog.showSaveDialogToSaveMarkdownFile();
      expect(result).toStrictEqual({ filePath: '/file/path' });
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledTimes(1);
      expect(fakeElectronDialog.showSaveDialog).toHaveBeenCalledWith(
        { msg: 'fakeBrowserWindow' },
        {
          filters: [{ extensions: ['md', 'markdown'], name: 'Markdown' }],
          properties: ['openFile', 'openDirectory']
        }
      );
    });
  });
});
