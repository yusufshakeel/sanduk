'use strict';

const tools = require('../renderer-process/tools');
const packageJson = require('../../package.json');

window.onload = () => {
  const { version } = packageJson;
  document.getElementById('sanduk-project-version').innerText = version;
  tools();
};
