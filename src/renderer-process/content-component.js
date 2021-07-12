'use strict';
const UUIDToolComponent = require('./tools/uuid-tool-component');
const EpochToolComponent = require('./tools/epoch-tool-component');
const Base64EncoderDecoderToolComponent = require('./tools/base64-encoder-decoder-tool-component');
const JsonFormatterToolComponent = require('./tools/json-formatter-tool-component');
const XmlFormatterToolComponent = require('./tools/xml-formatter-tool-component');

const uuidToolComponent = new UUIDToolComponent();
const epochToolComponent = new EpochToolComponent();
const base64EncoderDecoderToolComponent = new Base64EncoderDecoderToolComponent();
const jsonFormatterToolComponent = new JsonFormatterToolComponent();
const xmlFormatterToolComponent = new XmlFormatterToolComponent();

module.exports = async function contentComponent() {
  const html = `<div class="container-fluid p-10">
    <div class="row">
      <div class="col-12" id="main-content">
        <div id="base64-encoder-decoder-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="base64-encoder-decoder"
             class="sandook-tool-content-wrapper d-none">
             ${base64EncoderDecoderToolComponent.getHtml()}
        </div>
        <div id="epoch-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="epoch"
             class="sandook-tool-content-wrapper d-none">
             ${epochToolComponent.getHtml()}
        </div>
        <div id="json-formatter-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="json-formatter"
             class="sandook-tool-content-wrapper d-none">
             ${jsonFormatterToolComponent.getHtml()}
        </div>
        <div id="jwt-decoder-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="jwt-decoder"
             class="sandook-tool-content-wrapper d-none">jwt decoder
        </div>
        <div id="uuid-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="uuid"
             class="sandook-tool-content-wrapper d-none">
          ${uuidToolComponent.getUUIDV4Html()}
          <hr class="my-20 border-bottom">
          ${uuidToolComponent.getUUIDV5Html()}
        </div>
        <div id="xml-formatter-content-wrapper"
             data-sanduk-tool-isActive="false"
             data-sanduk-tool-name="xml-formatter"
             class="sandook-tool-content-wrapper d-none">
             ${xmlFormatterToolComponent.getHtml()}
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('content-wrapper').innerHTML = html;

  uuidToolComponent.initUUIDV4();
  uuidToolComponent.initUUIDV5();
  epochToolComponent.init();
  base64EncoderDecoderToolComponent.init();
  jsonFormatterToolComponent.init();
  xmlFormatterToolComponent.init();
};