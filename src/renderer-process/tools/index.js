'use strict';

const base64EncoderDecoder = require('../tools/base64-encoder-decoder');
const csvToJson = require('../tools/csv-to-json');
const editor = require('../tools/editor');
const epoch = require('../tools/epoch');
const jsonFormatter = require('../tools/json-formatter');
const jwtDecoder = require('../tools/jwt-decoder');
const markdown = require('../tools/markdown');
const uuid = require('../tools/uuid');
const xmlFormatter = require('../tools/xml-formatter');
const xmlToJson = require('../tools/xml-to-json');

module.exports = async function tools({ eventEmitter }) {
  base64EncoderDecoder({ eventEmitter });
  csvToJson({ eventEmitter });
  editor({ eventEmitter });
  epoch();
  jsonFormatter({ eventEmitter });
  jwtDecoder({ eventEmitter });
  markdown({ eventEmitter });
  uuid();
  xmlFormatter({ eventEmitter });
  xmlToJson();
};
