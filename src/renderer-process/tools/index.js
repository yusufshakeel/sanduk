'use strict';

const base64EncoderDecoder = require('../tools/base64-encoder-decoder');
const editor = require('../tools/editor');
const epoch = require('../tools/epoch');
const jsonFormatter = require('../tools/json-formatter');
const jwtDecoder = require('../tools/jwt-decoder');
const markdown = require('../tools/markdown');
const uuid = require('../tools/uuid');
const xmlFormatter = require('../tools/xml-formatter');
const xmlToJson = require('../tools/xml-to-json');

module.exports = async function tools() {
  base64EncoderDecoder();
  editor();
  epoch();
  jsonFormatter();
  jwtDecoder();
  markdown();
  uuid();
  xmlFormatter();
  xmlToJson();
};
