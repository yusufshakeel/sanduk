'use strict';
const mainIPCHandler = require('./main-ipc');

function ipcHandler({ appBrowserWindows }) {
  mainIPCHandler({ appBrowserWindows });
}

module.exports = ipcHandler;
